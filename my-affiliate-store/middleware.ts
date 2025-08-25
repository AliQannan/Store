// middleware.ts (in your root directory)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const isSystemRoute = createRouteMatcher(['/api/system(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Only check admin for /api/system routes
  if (!isSystemRoute(req)) {
    return NextResponse.next()
  }

  try {
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
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
