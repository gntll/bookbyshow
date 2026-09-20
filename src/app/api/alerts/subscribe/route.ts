import { NextResponse } from 'next/server';
import { subscribeToPriceAlert, isValidEmail } from '@/services/alerts';
import { PriceAlertSubscribeRequest } from '@/types/alerts';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PriceAlertSubscribeRequest;

    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address provided.' },
        { status: 400 }
      );
    }

    if (!body.targetId || !body.title || typeof body.targetPrice !== 'number' || body.targetPrice <= 0) {
      return NextResponse.json(
        { error: 'Missing or invalid alert target parameters.' },
        { status: 400 }
      );
    }

    const subscription = await subscribeToPriceAlert(body);

    return NextResponse.json({
      success: true,
      message: `Price drop alert activated for ${body.title}. Monitoring for prices under $${body.targetPrice}.`,
      subscription,
    });
  } catch (error: any) {
    console.error('Failed to register price alert:', error);
    return NextResponse.json(
      { error: 'Internal server error while subscribing to price alert.', message: error.message },
      { status: 500 }
    );
  }
}
