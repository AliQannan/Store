import { adminOnly } from './adminOnly';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  return adminOnly(req, async () => {
    return NextResponse.json({ message: 'Welcome, admin!' });
  });
}
