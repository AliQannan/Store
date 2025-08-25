// app/api/system/adminOnly.ts
import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function adminOnly(req: Request, handler: () => Promise<Response>) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // جلب بيانات المستخدم من Clerk
  const userEmail = req.headers.get('x-user-email'); // أو اجلب من session
  if (!userEmail) return NextResponse.json({ error: 'Email not found' }, { status: 401 });

  const adminUser = await prisma.admin_users.findUnique({
    where: { email: userEmail },
  });

  if (!adminUser) return NextResponse.json({ error: 'Access denied' }, { status: 403 });

  // لو موجود admin، نفّذ الhandler الأصلي
  return handler();
}
