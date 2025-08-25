// app/api/system/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Note: With middleware approach, you don't need to import withAdminAuth
// The middleware automatically protects all /api/system/* routes

async function handler(req: NextRequest) {
  // This route is automatically protected by middleware
  // Only admin users can reach this point
  
  return NextResponse.json({ 
    message: 'Admin route accessed successfully',
    timestamp: new Date().toISOString()
  })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler

// Alternative: If you want to use withAdminAuth instead of middleware
// Uncomment the lines below and comment out the exports above

/*
import { withAdminAuth } from '@/utils/withAdminAuth'

async function protectedHandler(req: NextRequest) {
  const adminEmail = req.headers.get('x-admin-email')
  const adminId = req.headers.get('x-admin-id')
  
  return NextResponse.json({ 
    message: 'Admin route accessed successfully',
    admin: { email: adminEmail, id: adminId },
    timestamp: new Date().toISOString()
  })
}

export const GET = withAdminAuth(protectedHandler)
export const POST = withAdminAuth(protectedHandler)
export const PUT = withAdminAuth(protectedHandler)
export const DELETE = withAdminAuth(protectedHandler)
*/
