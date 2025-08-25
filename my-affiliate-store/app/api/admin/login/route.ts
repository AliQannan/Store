// app/api/admin/login/route.ts
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find admin user
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!adminUser) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.password)

    if (!isValidPassword) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        adminId: adminUser.id,
        email: adminUser.email,
        role: adminUser.role 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    // Set cookie and return response
    const response = Response.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      },
      token
    })

    // Set HTTP-only cookie for browser clients
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error) {
    console.error('Admin login error:', error)
    return Response.json(
      { error: 'Login failed' },
      { status: 500 }
    )
  }
}

// Optional: Admin logout
export async function DELETE() {
  const response = Response.json({ 
    success: true, 
    message: 'Logged out successfully' 
  })
  
  response.cookies.delete('admin_token')
  return response
}
