import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Middleware للتحقق من أن المستخدم موجود في جدول Admin
 * @param req NextRequest
 * @param handler دالة async ترجع NextResponse عند نجاح التحقق
 */
export async function adminOnly(
  req: NextRequest,
  handler: () => Promise<NextResponse>
) {
  // الحصول على بيانات المستخدم من Clerk
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // جلب بيانات المستخدم من Clerk
  const userEmail = getAuth(req).userId
    ? await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${process.env.CLERK_API_KEY}` },
      }).then(res => res.json()).then(data => data.email)
    : null;

  if (!userEmail) {
    return NextResponse.json({ error: 'Email not found' }, { status: 401 });
  }

  // التحقق من وجود المستخدم في جدول Admin
  const adminUser = await prisma.adminUser.findUnique({
    where: { email: userEmail },
  });

  if (!adminUser) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // إذا كان المستخدم موجودًا كـ admin، نفذ الدالة handler
  return handler();
}
