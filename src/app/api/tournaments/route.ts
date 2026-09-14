import { NextResponse } from 'next/server';
import { INITIAL_TOURNAMENTS } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type');

  let result = INITIAL_TOURNAMENTS;

  if (status && status !== 'all') {
    result = result.filter(t => t.status === status);
  }
  if (type && type !== 'all') {
    result = result.filter(t => t.type === type);
  }

  return NextResponse.json({
    success: true,
    data: result,
    total: result.length,
  });
}
