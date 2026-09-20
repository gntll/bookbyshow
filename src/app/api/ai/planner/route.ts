import { NextRequest, NextResponse } from 'next/server';
import { generateEveningPlan } from '@/services/ai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, venueName, city, scheduledTime } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Missing title parameter' },
        { status: 400 }
      );
    }

    const plan = generateEveningPlan(
      title,
      venueName || 'Premier Cinema & Box Office',
      city || 'New York',
      scheduledTime || '7:30 PM'
    );

    return NextResponse.json({
      success: true,
      plan,
    });
  } catch (err: any) {
    console.error('Error in /api/ai/planner:', err);
    return NextResponse.json(
      { error: 'Failed to generate evening plan' },
      { status: 500 }
    );
  }
}
