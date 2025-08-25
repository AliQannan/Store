// utils/withAdminAuth.ts
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

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

      // Optional: Check if admin is active
      if (adminUser.status && adminUser.status !== 'active') {
        return NextResponse.json(
          { error: 'Forbidden - Admin account not active' },
          { status: 403 }
        )
      }

      // Add admin info to request headers for use in handler
      const headers = new Headers(req.headers)
      headers.set('x-admin-email', userEmail)
      headers.set('x-admin-id', adminUser.id.toString())
      headers.set('x-user-id', userId)

      // Create new request with updated headers
      const newReq = new NextRequest(req.url, {
        method: req.method,
        headers,
        body: req.body,
      })

      return handler(newReq, context)
    } catch (error) {
      console.error('Admin auth error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }
  }
}
