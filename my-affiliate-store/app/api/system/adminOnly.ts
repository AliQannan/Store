import { NextResponse, NextRequest } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function adminOnly(req: NextRequest, handler: () => Promise<NextResponse>) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // جلب البريد الإلكتروني مباشرة من بيانات Clerk
  const userEmail = req.headers.get('x-user-email'); // أو استخدم session من getAuth
  if (!userEmail) return NextResponse.json({ error: 'Email not found' }, { status: 401 });

  const adminUser = await prisma.admin_users.findUnique({
    where: { email: userEmail },
  });

  if (!adminUser) return NextResponse.json({ error: 'Access denied' }, { status: 403 });

  return handler();
}
