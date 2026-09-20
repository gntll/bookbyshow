import { NextRequest, NextResponse } from 'next/server';
import { evaluatePriceAlerts, getActiveAlerts } from '@/services/alerts';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');

  // If action is evaluate, or called by Vercel Cron, or authorized via CRON_SECRET, run evaluation
  const shouldEvaluate =
    action === 'evaluate' ||
    isVercelCron ||
    (cronSecret && authHeader === `Bearer ${cronSecret}`);

  if (shouldEvaluate) {
    try {
      const result = await evaluatePriceAlerts();
      return NextResponse.json({
        success: true,
        triggeredBy: isVercelCron ? 'vercel_cron' : 'scheduled_get',
        timestamp: new Date().toISOString(),
        ...result,
      });
    } catch (error: any) {
      console.error('Failed to execute price alerts check:', error);
      return NextResponse.json(
        { error: 'Failed to evaluate price alerts', message: error.message },
        { status: 500 }
      );
    }
  }

  // Read-only status response
  const activeAlerts = getActiveAlerts();
  return NextResponse.json({
    status: 'ok',
    activeAlertsCount: activeAlerts.length,
    activeAlerts: activeAlerts.map((a) => ({
      id: a.id,
      email: a.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      title: a.title,
      targetPrice: a.targetPrice,
      createdAt: a.createdAt,
    })),
  });
}

export async function POST(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await evaluatePriceAlerts();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error: any) {
    console.error('Failed to execute price alerts check:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate price alerts', message: error.message },
      { status: 500 }
    );
  }
}
