import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Image from 'next/image'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import GSTLogo from '../components/GSTLogo';
// In your JSX
// استيراد خطوط Google
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// بيانات الموقع
export const metadata: Metadata = {
  title: 'GST',
  description: 'chose',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center p-4 gap-4 h-16 shadow-md">
            {/* Logo */}
            <div className="flex-shrink-0">

<GSTLogo size={120} className="mx-auto" />
           </div>

            {/* أزرار تسجيل الدخول والتسجيل أو حساب المستخدم */}
            <div className="flex gap-4 items-center">
              <SignedOut>
                <SignInButton>
                  <button className="bg-gray-200 text-black rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {/* محتوى الصفحة */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}

