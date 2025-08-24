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
  title: 'GST Health',
  description: 'Choose',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
        >
          {/* Navbar */}
          <header className="flex justify-between items-center px-8 h-16 border-b border-gray-200 bg-white shadow-sm dark:bg-gray-950 dark:border-gray-800 transition-colors duration-300">
            
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border-2 border-black dark:border-white">
                {/* GST Letters */}
                <span className="text-xl font-extrabold tracking-wide text-black dark:text-white">
                  GST
                </span>
                {/* Medical Cross */}
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-sm bg-black dark:bg-white">
                  <span className="block w-3 h-3 bg-white dark:bg-black"></span>
                </span>
              </div>
            </div>

            {/* Auth buttons */}
            <div className="flex gap-3 items-center">
              <SignedOut>
                <SignInButton>
                  <button className="border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
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
