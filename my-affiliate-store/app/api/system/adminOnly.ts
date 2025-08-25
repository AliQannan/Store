import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs/server';

export const GET = async (req: NextRequest) => {
  const { userId } = await getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // الحصول على كائن المستخدم الكامل
    const user = await clerkClient.users.getUser(userId);

    // الوصول إلى البريد الإلكتروني الأساسي
    const email = user.primaryEmailAddress?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: 'Email not found' }, { status: 401 });
    }

    // تنفيذ العمليات المطلوبة باستخدام البريد الإلكتروني
    // ...

    return NextResponse.json({ message: 'Operation successful' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
};
