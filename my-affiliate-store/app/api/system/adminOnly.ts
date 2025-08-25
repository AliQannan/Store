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
  const { userId, emailAddresses } = getAuth(req);

  if (!userId || !emailAddresses || emailAddresses.length === 0) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // أخذ البريد الرئيسي للمستخدم
  const userEmail = emailAddresses[0].emailAddress;

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
