import { type Metadata } from "next"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"
import Image from "next/image"
import "./globals.css"

// استيراد خطوط Google
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// بيانات الموقع
export const metadata: Metadata = {
  title: "GST Health - Premium Wellness Products",
  description: "Discover the best health and wellness products for your lifestyle",
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
          <p>
          Impact-Site-Verification: 37f50291-4b2f-4c43-92a2-3c4a27485b2e</p>
          {/* Navbar */}
          <header className="flex justify-between items-center px-8 h-20 border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-sm transition-colors duration-300">
            {/* Logo - تم تكبيره وتحسينه */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center">
                <Image 
                  src="/smart.png" 
                  alt="GST Health Logo" 
                  width={160} 
                  height={50} 
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-green-700 hidden md:block">
                GST Health
              </span>
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
                  <button className="bg-green-600 hover:bg-green-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
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
