// middleware.ts (in your root directory)
import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/prisma/client'

const prisma = new PrismaClient()

export default authMiddleware({
  publicRoutes: ["/"], // Add your public routes here
  
  async beforeAuth(auth, req) {
    // Only check admin for /api/system routes
    if (!req.nextUrl.pathname.startsWith('/api/system')) {
      return NextResponse.next()
    }

    try {
      // Get user from Clerk
      const { userId } = auth()
      
      if (!userId) {
        return NextResponse.json(
          { error: 'Unauthorized - Please sign in' },
          { status: 401 }
        )
      }

      // Get user info from Clerk to get email
      const { clerkClient } = await import('@clerk/nextjs/server')
      const user = await clerkClient.users.getUser(userId)

      if (!user.emailAddresses || user.emailAddresses.length === 0) {
        return NextResponse.json(
          { error: 'No email found for user' },
          { status: 400 }
        )
      }

      const userEmail = user.emailAddresses[0].emailAddress

      // Check if email exists in admin table
      const adminUser = await prisma.admin.findUnique({
        where: {
          email: userEmail
        }
      })

      if (!adminUser) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }

      // Optional: Check if admin is active
      if (adminUser.status && adminUser.status !== 'active') {
        return NextResponse.json(
          { error: 'Forbidden - Admin account not active' },
          { status: 403 }
        )
      }

      return NextResponse.next()
    } catch (error) {
      console.error('Admin middleware error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}

// Alternative approach: Custom middleware function
// middleware.ts (Alternative approach)
import { authMiddleware } from "@clerk/nextjs"
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/prisma/client'

const prisma = new PrismaClient()

async function checkAdminAccess(req: NextRequest) {
  try {
    const { auth } = await import('@clerk/nextjs/server')
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { clerkClient } = await import('@clerk/nextjs/server')
    const user = await clerkClient.users.getUser(userId)
    const userEmail = user.emailAddresses[0]?.emailAddress

    if (!userEmail) {
      return NextResponse.json(
        { error: 'No email found' },
        { status: 400 }
      )
    }

    const adminUser = await prisma.admin.findUnique({
      where: { email: userEmail }
    })

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Access denied - Admin required' },
        { status: 403 }
      )
    }

    return null // No error, continue
  } catch (error) {
    console.error('Admin check error:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}

export default authMiddleware({
  publicRoutes: ["/"],
  
  async afterAuth(auth, req) {
    // Check admin access for /api/system routes
    if (req.nextUrl.pathname.startsWith('/api/system')) {
      const adminCheck = await checkAdminAccess(req)
      if (adminCheck) return adminCheck // Return error response
    }
    
    return NextResponse.next()
  }
})

// Higher-Order Function approach for individual routes
// utils/withAdminAuth.ts
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/prisma/client'

const prisma = new PrismaClient()

type ApiHandler = (
  req: NextRequest,
  context?: { params: any }
) => Promise<NextResponse>

export function withAdminAuth(handler: ApiHandler): ApiHandler {
  return async (req: NextRequest, context?: { params: any }) => {
    try {
      const { userId } = auth()

      if (!userId) {
        return NextResponse.json(
          { error: 'Unauthorized - Please sign in' },
          { status: 401 }
        )
      }

      // Get user email from Clerk
      const user = await clerkClient.users.getUser(userId)
      const userEmail = user.emailAddresses[0]?.emailAddress

      if (!userEmail) {
        return NextResponse.json(
          { error: 'No email address found for user' },
          { status: 400 }
        )
      }

      // Check if user is admin
      const adminUser = await prisma.admin.findUnique({
        where: {
          email: userEmail
        }
      })

      if (!adminUser) {
        return NextResponse.json(
          { error: 'Forbidden - Admin access required' },
          { status: 403 }
        )
      }

      // Add admin info to request for use in handler
      req.headers.set('x-admin-email', userEmail)
      req.headers.set('x-admin-id', adminUser.id.toString())
      req.headers.set('x-user-id', userId)

      return handler(req, context)
    } catch (error) {
      console.error('Admin auth error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}

// Example usage in API route:
// app/api/system/users/route.ts
/*
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
*/
