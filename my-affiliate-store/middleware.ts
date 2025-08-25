import { clerkMiddleware, getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default clerkMiddleware({
  afterAuth: async (req, event) => {
    try {
      // الحصول على بيانات المستخدم من Clerk
      const { userId } = getAuth(req);

      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // جلب البريد الإلكتروني للمستخدم من Clerk
      const user = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
        },
      }).then(res => res.json());

      const userEmail = user.email_addresses[0]?.email_address;
      if (!userEmail) {
        return NextResponse.json({ error: 'Email not found' }, { status: 401 });
      }

      // تحقق من وجود المستخدم في جدول admin_users عبر Prisma
      const adminUser = await prisma.admin_users.findUnique({
        where: { email: userEmail },
      });

      if (!adminUser) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }

      // السماح بالاستمرار
      return NextResponse.next();

    } catch (err) {
      return NextResponse.json({ error: 'Server error', details: err }, { status: 500 });
    }
  },
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
