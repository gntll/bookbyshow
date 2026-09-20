import { NextResponse } from 'next/server';
import { getAllEvents, getEventsByCategory } from '@/services/events';

export const revalidate = 3600; // 1-hour ISR cache

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;

  try {
    const events = await getEventsByCategory(category);
    return NextResponse.json({ events, count: events.length });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch events', message: error.message },
      { status: 500 }
    );
  }
}
