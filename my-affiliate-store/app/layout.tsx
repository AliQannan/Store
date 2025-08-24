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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-between items-center px-6 h-16 shadow-md bg-white">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center text-4xl sm:text-5xl font-extrabold tracking-widest">
                <span className="text-green-600">G</span>
                <span className="text-black">S</span>
                <span className="relative inline-block">
                  {/* T مع كوفية */}
                  <span
                    className="text-transparent font-extrabold px-2 py-1 rounded-md shadow-md"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, black 0 10px, white 10px 20px)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    T
                  </span>
                  {/* النقاط الملونة للهوية الفلسطينية */}
                  <span className="absolute -top-2 -right-3 w-3 h-3 bg-red-600 rounded-full"></span>
                  <span className="absolute -bottom-2 -left-3 w-3 h-3 bg-green-600 rounded-full"></span>
                </span>
              </div>
            </div>

            {/* أزرار تسجيل الدخول والتسجيل أو حساب المستخدم */}
            <div className="flex gap-3 items-center">
              <SignedOut>
                <SignInButton>
                  <button className="bg-gray-100 hover:bg-gray-200 transition text-black rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-[#6c47ff] hover:bg-[#5635d6] transition text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-11 px-5 cursor-pointer">
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
