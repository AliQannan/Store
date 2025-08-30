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

// Google fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Site metadata
export const metadata: Metadata = {
  title: "GST Health - Expert Reviews of Health & Sports Products",
  description:
    "Trusted expert reviews and recommendations for the best health, wellness, and sports products on the market",
  keywords: "health products, sports equipment, product reviews, wellness, fitness",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300`}
        >
          {/* Enhanced Navbar */}
          <header className="sticky top-0 z-50 flex justify-between items-center px-6 lg:px-8 h-20 border-b border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800 shadow-sm transition-colors duration-300 backdrop-blur-sm bg-white/95">
            {/* Logo */}
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

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 mr-8">
              <a
                href="#products"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium"
              >
                Products
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium"
              >
                About
              </a>
              <a
                href="#reviews"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors font-medium"
              >
                Contact
              </a>
            </nav>

            {/* Auth buttons */}
            <div className="flex gap-3 items-center">
  {/* Language Toggle */}
  <button
    onClick={() => {
      const event = new CustomEvent("toggle-language");
      window.dispatchEvent(event);
    }}
    className="ml-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
  >
    العربية / English
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

          {/* Page content */}
          <main>{children}</main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <Image
                  src="/smart.png"
                  alt="GST Health Logo"
                  width={140}
                  height={44}
                  className="h-11 w-auto mb-4"
                />
                <p className="text-gray-400 text-sm">
                  Expert reviews and recommendations for health and sports
                  products you can trust.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Our Team
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Press
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Webinars
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-green-400 transition-colors">
                      Disclaimer
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>© {new Date().getFullYear()} GST Health. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
