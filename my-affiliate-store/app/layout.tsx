import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

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
  description: 'Choose',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
        >
          <header className="flex justify-between items-center px-8 h-16 border-b border-gray-200 bg-white shadow-sm">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center text-4xl font-extrabold tracking-tight">
                <span className="text-black">G</span>
                <span className="text-gray-700">S</span>
                <span
                  className="text-transparent font-extrabold px-2"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, black 0 8px, white 8px 16px)",
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  T
                </span>
              </div>
            </div>

            {/* Auth buttons */}
            <div className="flex gap-3 items-center">
              <SignedOut>
                <SignInButton>
                  <button className="border border-gray-300 text-gray-800 hover:bg-gray-100 transition rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-black text-white hover:bg-gray-800 transition rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
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
          <main className="px-6 py-8">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
