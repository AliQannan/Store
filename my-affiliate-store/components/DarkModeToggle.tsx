// components/DarkModeToggle.tsx (Client Component)
"use client"
import { useState } from "react"

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
    >
      {darkMode ? "Light" : "Dark"}
    </button>
  )
}
