"use client"

import { useState } from "react"
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
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ClerkProvider>
      <html lang="en" className={darkMode ? "dark" : ""}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300`}
        >
          {/* Navbar */}
          <header className="flex justify-between items-center px-8 h-16 border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-sm transition-colors duration-300">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-green-600">
                {/* GST Letters */}
                <span className="text-xl font-extrabold tracking-wide text-white">
                  GST
                </span>
                {/* Leaf / Tree Icon */}
                <span className="absolute -top-2 -right-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2C11.1 2 12 2.9 12 4C12 5.1 11.1 6 10 6C8.9 6 8 5.1 8 4C8 2.9 8.9 2 10 2ZM5 8C6.1 8 7 8.9 7 10C7 11.1 6.1 12 5 12C3.9 12 3 11.1 3 10C3 8.9 3.9 8 5 8ZM15 8C16.1 8 17 8.9 17 10C17 11.1 16.1 12 15 12C13.9 12 13 11.1 13 10C13 8.9 13.9 8 15 8Z" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Auth buttons + Dark Mode Toggle */}
            <div className="flex gap-3 items-center">
              <button
                onClick={toggleDarkMode}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full transition"
              >
                {darkMode ? "Light" : "Dark"}
              </button>

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
