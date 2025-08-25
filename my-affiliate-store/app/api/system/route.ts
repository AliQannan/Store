// app/api/system/route.ts
import { NextRequest } from 'next/server'
import { withAdminAuth, AdminUser } from '@/lib/admin-auth'
import { prisma } from '@/lib/prisma'

async function handleSystemRequest(request: NextRequest, admin: AdminUser) {
  try {
    const method = request.method

    switch (method) {
      case 'GET':
        // Example: Get system stats
        const stats = await getSystemStats()
        return Response.json({ 
          success: true, 
          data: stats,
          admin: admin.email 
        })

      case 'POST':
        const body = await request.json()
        // Handle system configuration updates
        const result = await updateSystemConfig(body, admin)
        return Response.json({ 
          success: true, 
          data: result 
        })

      default:
        return Response.json(
          { error: 'Method not allowed' }, 
          { status: 405 }
        )
    }
  } catch (error) {
    console.error('System API error:', error)
    return Response.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

async function getSystemStats() {
  const [userCount, productCount, adminCount] = await Promise.all([
    prisma.user.count(),
    prisma.product.count(),
    prisma.adminUser.count()
  ])

  return {
    users: userCount,
    products: productCount,
    admins: adminCount,
    timestamp: new Date().toISOString()
  }
}

async function updateSystemConfig(config: any, admin: AdminUser) {
  // Log admin action
  console.log(`Admin ${admin.email} updated system config:`, config)
  
  // Your system update logic here
  return { 
    message: 'System configuration updated',
    updatedBy: admin.email,
    timestamp: new Date().toISOString()
  }
}

// Export the protected handler
export const GET = withAdminAuth(handleSystemRequest)
export const POST = withAdminAuth(handleSystemRequest)
export const PUT = withAdminAuth(handleSystemRequest)
export const DELETE = withAdminAuth(handleSystemRequest)
