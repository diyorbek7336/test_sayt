'use client'

import Link from "next/link"
import { useState } from "react"

const baseNavClass =
  "text-sm lg:text-base text-gray-200 px-3 py-2 rounded-full transition-colors duration-200 hover:text-white hover:bg-white/10"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 pt-3">
        <div className="flex items-center justify-between rounded-full bg-gray-900/80 backdrop-blur border border-white/10 px-4 sm:px-6 py-2 shadow-lg">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
              S
            </span>
            <span className="text-white text-lg sm:text-xl font-semibold tracking-tight">
              Server ITuz
            </span>
          </Link>

          <ul className="hidden md:flex gap-2 lg:gap-4 items-center">
            <li><Link href="/" className={baseNavClass}>Bosh sahifa</Link></li>
            <li><Link href="/about" className={baseNavClass}>Biz haqimizda</Link></li>
            <li><Link href="/#cards" className={baseNavClass}>Servislarimiz</Link></li>
            <li><Link href="/#manzil" className={baseNavClass}>Biz bilan ishlashadi</Link></li>
            <li>
              <Link
                href="/Consultation"
                className="text-sm lg:text-base px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md transition-colors duration-200"
              >
                Bepul konsultatsiya
              </Link>
            </li>
          </ul>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <span className="text-2xl">&#10005;</span> : <span className="text-2xl">&#9776;</span>}
            </button>
          </div>
        </div>
      </div>

      <ul
        className={`md:hidden mx-4 mt-2 flex flex-col gap-2 rounded-2xl bg-gray-900/95 backdrop-blur border border-white/10 px-4 py-3 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <li><Link href="/" className={baseNavClass} onClick={() => setIsOpen(false)}>Bosh sahifa</Link></li>
        <li><Link href="/about" className={baseNavClass} onClick={() => setIsOpen(false)}>Biz haqimizda</Link></li>
        <li><Link href="/#cards" className={baseNavClass} onClick={() => setIsOpen(false)}>Servislarimiz</Link></li>
        <li><Link href="/#manzil" className={baseNavClass} onClick={() => setIsOpen(false)}>Biz bilan ishlashadi</Link></li>
        <li>
          <Link
            href="/Consultation"
            className="block text-center text-sm px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Bepul konsultatsiya
          </Link>
        </li>
      </ul>
    </header>
  )
}
