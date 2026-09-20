import { PriceAlertSubscription, PriceAlertSubscribeRequest, PriceAlertCheckResult } from '@/types/alerts';
import { env } from '@/config/env';
import { getAllMovies } from '@/services/movies';
import { getAllEvents } from '@/services/events';

// Global in-memory subscriber registry across serverless invocations within the process
declare global {
  // eslint-disable-next-line no-var
  var __bbs_alert_store: PriceAlertSubscription[] | undefined;
}

if (!global.__bbs_alert_store) {
  global.__bbs_alert_store = [];
}

const alertStore = global.__bbs_alert_store;

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Subscribes a user to price drop alerts for a movie or event
 */
export async function subscribeToPriceAlert(data: PriceAlertSubscribeRequest): Promise<PriceAlertSubscription> {
  const existing = alertStore.find(
    (a) => a.email.toLowerCase() === data.email.toLowerCase() && a.targetId === data.targetId && a.status === 'active'
  );

  if (existing) {
    existing.targetPrice = data.targetPrice;
    return existing;
  }

  const newAlert: PriceAlertSubscription = {
    id: `alert_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: data.email.toLowerCase().trim(),
    targetId: data.targetId,
    targetType: data.targetType,
    title: data.title,
    initialPrice: data.initialPrice,
    targetPrice: data.targetPrice,
    createdAt: new Date().toISOString(),
    status: 'active',
  };

  alertStore.push(newAlert);

  // Send activation confirmation email
  await sendActivationEmail(newAlert);

  return newAlert;
}

/**
 * Returns all subscriptions
 */
export function getActiveAlerts(): PriceAlertSubscription[] {
  return alertStore.filter((a) => a.status === 'active');
}

/**
 * Evaluates pending alerts against current lowest price quotes across theaters & partners
 */
export async function evaluatePriceAlerts(): Promise<PriceAlertCheckResult> {
  const [movies, events] = await Promise.all([getAllMovies(), getAllEvents()]);
  
  const priceMap = new Map<string, { currentLowest: number; provider: string; url: string }>();

  for (const m of movies) {
    priceMap.set(m.id, {
      currentLowest: m.lowestPrice,
      provider: 'AMC / Fandango / Regal',
      url: `/movie/${m.slug}`,
    });
  }

  for (const e of events) {
    const lowestQuote = e.quotes.reduce((min, q) => (q.total < min.total ? q : min), e.quotes[0]);
    priceMap.set(e.id, {
      currentLowest: lowestQuote ? lowestQuote.total : e.minPrice,
      provider: lowestQuote ? lowestQuote.provider : 'Ticketmaster',
      url: `/event/${e.slug}`,
    });
  }

  const notifications: PriceAlertCheckResult['notifications'] = [];
  let triggeredCount = 0;

  for (const alert of alertStore) {
    if (alert.status !== 'active') continue;

    const targetInfo = priceMap.get(alert.targetId);
    if (!targetInfo) continue;

    alert.lastCheckedPrice = targetInfo.currentLowest;

    // Trigger alert if current price is at or below target price
    if (targetInfo.currentLowest <= alert.targetPrice) {
      alert.status = 'triggered';
      alert.triggeredAt = new Date().toISOString();
      triggeredCount++;

      const dispatchStatus = await sendPriceDropEmail(alert, targetInfo.currentLowest, targetInfo.provider, targetInfo.url);

      notifications.push({
        alertId: alert.id,
        email: alert.email,
        title: alert.title,
        targetPrice: alert.targetPrice,
        foundPrice: targetInfo.currentLowest,
        provider: targetInfo.provider,
        status: dispatchStatus,
      });
    }
  }

  return {
    checkedCount: alertStore.length,
    triggeredCount,
    activeCount: alertStore.filter((a) => a.status === 'active').length,
    notifications,
  };
}

/**
 * Dispatches an email via Resend if available, or logs structured email preview
 */
async function dispatchEmail(to: string, subject: string, html: string): Promise<'dispatched' | 'logged'> {
  if (env.hasResend) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.alertEmailFrom,
          to: [to],
          subject: subject,
          html: html,
        }),
      });

      if (res.ok) {
        return 'dispatched';
      }
      console.warn('Resend API returned non-ok status:', await res.text());
    } catch (e) {
      console.error('Failed to send email via Resend:', e);
    }
  }

  // Preview & Log Dispatcher Mode (local development or zero-key setup)
  console.log(`\n========================================`);
  console.log(`[BookByShow Email Dispatcher (Preview Mode)]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Date: ${new Date().toISOString()}`);
  console.log(`========================================\n`);

  return 'logged';
}

/**
 * Sends initial confirmation when a user sets a price alert
 */
async function sendActivationEmail(alert: PriceAlertSubscription) {
  const subject = `🔔 Price Alert Activated: ${alert.title} on BookByShow`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #060709; color: #fafafa; padding: 32px; border-radius: 12px; max-width: 540px; margin: 0 auto; border: 1px solid #272a33;">
      <h2 style="color: #e51821; margin-top: 0;">BookByShow Price Watcher</h2>
      <p style="font-size: 16px; line-height: 1.5; color: #d4d4d4;">
        We've activated real-time price monitoring for <strong>${alert.title}</strong>.
      </p>
      <div style="background: #0f1115; border: 1px solid #272a33; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 4px 0; color: #a1a1aa; font-size: 14px;">Initial Quote: <strong>$${alert.initialPrice.toFixed(2)}</strong></p>
        <p style="margin: 4px 0; color: #e51821; font-size: 16px; font-weight: bold;">Target Threshold: $${alert.targetPrice.toFixed(2)} or lower</p>
      </div>
      <p style="font-size: 14px; color: #a1a1aa;">
        You will receive an automated alert the moment verified tickets drop below your target price.
      </p>
      <hr style="border: none; border-top: 1px solid #272a33; margin: 24px 0;" />
      <p style="font-size: 12px; color: #71717a; text-align: center;">
        BookByShow • 100% Verified Price Transparency • <a href="https://bookbyshow.com" style="color: #e51821;">bookbyshow.com</a>
      </p>
    </div>
  `;

  await dispatchEmail(alert.email, subject, html);
}

/**
 * Sends notification when verified price drops below user target threshold
 */
async function sendPriceDropEmail(
  alert: PriceAlertSubscription,
  foundPrice: number,
  provider: string,
  url: string
): Promise<'dispatched' | 'logged'> {
  const subject = `🎉 Price Drop Alert! ${alert.title} now $${foundPrice.toFixed(2)}`;
  const destinationUrl = `${env.appUrl}${url}`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #060709; color: #fafafa; padding: 32px; border-radius: 12px; max-width: 540px; margin: 0 auto; border: 1px solid #e51821;">
      <h2 style="color: #e51821; margin-top: 0;">Good news! Tickets reached your target price</h2>
      <p style="font-size: 16px; line-height: 1.5; color: #d4d4d4;">
        Verified rates for <strong>${alert.title}</strong> dropped to <strong>$${foundPrice.toFixed(2)}</strong> on ${provider}.
      </p>
      <div style="background: #0f1115; border: 1px solid #272a33; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <p style="margin: 4px 0; color: #a1a1aa; font-size: 14px;">Your Target: <strong>$${alert.targetPrice.toFixed(2)}</strong></p>
        <p style="margin: 4px 0; color: #22c55e; font-size: 18px; font-weight: bold;">Current Verified Price: $${foundPrice.toFixed(2)}</p>
        <p style="margin: 4px 0; color: #a1a1aa; font-size: 12px;">Available through authorized box office: ${provider}</p>
      </div>
      <div style="text-align: center; margin: 28px 0;">
        <a href="${destinationUrl}" style="background: #e51821; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: bold; font-size: 15px; display: inline-block;">
          Compare & Book Lowest Rate →
        </a>
      </div>
      <hr style="border: none; border-top: 1px solid #272a33; margin: 24px 0;" />
      <p style="font-size: 12px; color: #71717a; text-align: center;">
        BookByShow Price Comparison Engine • All fees included upfront
      </p>
    </div>
  `;

  return await dispatchEmail(alert.email, subject, html);
}
