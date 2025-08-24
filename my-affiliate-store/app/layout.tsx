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
  title: "GST Health",
  description: "Choose",
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
          <header className="flex justify-between items-center px-8 h-16 border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-sm transition-colors duration-300">
            {/* Logo - التصميم الجديد */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center">
                {/* GST Letters with modern design */}
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-green-500 tracking-tight">G</span>
                  <span className="text-3xl font-bold text-green-500 tracking-tight">S</span>
                  <span className="text-3xl font-bold text-green-500 tracking-tight relative">
                    T
                    {/* Leaf icon positioned near the T */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 absolute -top-1 -right-3 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-300">Health</span>
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
