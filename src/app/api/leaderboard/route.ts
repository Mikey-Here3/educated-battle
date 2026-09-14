import { NextResponse } from 'next/server';
import { MOCK_LEADERBOARD } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_LEADERBOARD,
    total: MOCK_LEADERBOARD.length,
  });
}
