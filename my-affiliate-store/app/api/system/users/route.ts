import { withAdminAuth } from '@/utils/withAdminAuth'
import { NextRequest, NextResponse } from 'next/server'

async function handler(req: NextRequest) {
  const adminEmail = req.headers.get('x-admin-email')
  const adminId = req.headers.get('x-admin-id')
  
  return NextResponse.json({ 
    message: 'Admin route accessed successfully',
    admin: { email: adminEmail, id: adminId }
  })
}

export const GET = withAdminAuth(handler)
export const POST = withAdminAuth(handler)
export const PUT = withAdminAuth(handler)
export const DELETE = withAdminAuth(handler)
