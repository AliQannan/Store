// lib/admin-auth.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma' // Adjust path as needed
import jwt from 'jsonwebtoken'

export interface AdminUser {
  id: string
  email: string
  role: string
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    
    // Check if admin user exists in database
    const adminUser = await prisma.adminUser.findUnique({
      where: { id: decoded.adminId },
      select: { id: true, email: true, role: true }
    })
    
    return adminUser
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

export async function getAdminFromRequest(request: NextRequest): Promise<AdminUser | null> {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('authorization')
  let token: string | null = null
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7)
  }
  
  // Fallback: try to get token from cookies
  if (!token) {
    token = request.cookies.get('admin_token')?.value || null
  }
  
  if (!token) {
    return null
  }
  
  return await verifyAdminToken(token)
}

export function createAdminResponse(message: string, status: number = 401) {
  return new Response(
    JSON.stringify({ 
      error: message,
      code: 'ADMIN_ACCESS_REQUIRED' 
    }), 
    { 
      status,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}

// Higher-order function to wrap API routes with admin authentication
export function withAdminAuth<T extends any[]>(
  handler: (request: NextRequest, admin: AdminUser, ...args: T) => Promise<Response>
) {
  return async (request: NextRequest, ...args: T): Promise<Response> => {
    try {
      const admin = await getAdminFromRequest(request)
      
      if (!admin) {
        return createAdminResponse('Admin authentication required')
      }
      
      // Optional: Check for specific roles
      // if (admin.role !== 'super_admin' && admin.role !== 'admin') {
      //   return createAdminResponse('Insufficient permissions', 403)
      // }
      
      return await handler(request, admin, ...args)
    } catch (error) {
      console.error('Admin auth middleware error:', error)
      return createAdminResponse('Authentication error', 500)
    }
  }
}
