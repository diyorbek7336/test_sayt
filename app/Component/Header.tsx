'use client'
import Link from "next/link";
import { useState,useEffect } from "react"
export default function Header(){

    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
         <header className="bg-gray-800/80 shadow-lg shadow-gray-800/80 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h2 className="text-white text-3xl">Server ITuz</h2>

     
          <ul className="hidden md:flex gap-6 items-center">
            <li><Link href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bosh sahifa</Link></li>
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Biz haqimizda</a></li>
            <li><a href="#cards" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Servislarimiz</a></li>
            <li><a href="#manzil" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Manzil</a></li>
            <li><Link href="/Consultation" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bepul Consultatsiya olish</Link></li>
          </ul>

 
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
           
              {isOpen ? (
                <span className="text-2xl">&#10005;</span> 
              ) : (
                <span className="text-2xl">&#9776;</span> 
              )}
            </button>
          </div>
        </div>

 
        <ul className={`md:hidden mt-4 flex flex-col gap-4 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96" : "max-h-0"}`}>
          <li><Link href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bosh sahifa</Link></li>
            <li><a href="#" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Biz haqimizda</a></li>
            <li><a href="#cards" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Servislarimiz</a></li>
            <li><a href="#manzil" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Manzil</a></li>
            <li><Link href="/Consultation" className="nav-link text-white text-lg relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full">Bepul Consultatsiya olish</Link></li>
        </ul>
      </header>
        </>
    )
}