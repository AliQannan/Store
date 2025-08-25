// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    const email = process.env.ADMIN_EMAIL || 'admin@example.com'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    const role = process.env.ADMIN_ROLE || 'admin'

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const admin = await prisma.adminUser.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role
      },
      create: {
        email,
        password: hashedPassword,
        role
      }
    })

    console.log('Admin user created/updated:', {
      id: admin.id,
      email: admin.email,
      role: admin.role
    })

  } catch (error) {
    console.error('Error creating admin:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

// Alternative: API endpoint to create admin (use with caution!)
// app/api/admin/create/route.ts
/*
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Add additional security check here (e.g., master password, IP whitelist, etc.)
    const masterKey = request.headers.get('x-master-key')
    if (masterKey !== process.env.MASTER_KEY) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email, password, role = 'admin' } = await request.json()

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await prisma.adminUser.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role
      },
      select: {
        id: true,
        email: true,
        role: true
      }
    })

    return Response.json({
      success: true,
      message: 'Admin user created',
      admin
    })

  } catch (error) {
    console.error('Create admin error:', error)
    return Response.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    )
  }
}
*/
