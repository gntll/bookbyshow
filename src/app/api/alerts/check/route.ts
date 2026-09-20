import { NextResponse } from 'next/server';
import { evaluatePriceAlerts, getActiveAlerts } from '@/services/alerts';

export const dynamic = 'force-dynamic';

export async function GET() {
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

export async function POST() {
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
