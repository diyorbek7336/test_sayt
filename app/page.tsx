'use client'
import { useEffect, useState } from "react"
import Header from "./Component/Header";
import Card from "../app/Component/Card"
import Location from "./Component/Location";
import Ariza from "../app/Component/Ariza"
import Link from "next/link";

export default function Home() {
  

  return (
    <>
   
  <Header/>
<main
      className="relative bg-gray-900 text-white py-32 flex items-center justify-center"
      style={{ 
        backgroundImage: `url(https://static.vecteezy.com/system/resources/thumbnails/002/883/759/small/illustration-of-world-and-network-photo.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-4 font-mono">Professional IT yechimlar bizda!</h1>
        <p className="text-lg text-gray-200 mb-8 font-mono">Web development, network security, automation, CCTV services.</p>
       <Link href="/Consultation"><button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full shadow-lg transition-all duration-300">Bepul konsultatsiya</button></Link>
      </div>
    </main>



     <div id="cards"> <Card/></div>
     <div id="manzil"><Location/></div>







       <h2 className="text-4xl font-bold text-black mb-6 text-center mt-20">
  Nima uchun bizni tanlashadi?
</h2>
<p className="text-gray-700 text-center mb-12">
  Biz mijozlarga eng samarali IT yechimlarni taqdim qilamiz, ish jarayonini soddalashtiramiz va xavfsizligini ta’minlaymiz.
</p>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-15">
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300">
    <h3 className="text-5xl font-bold text-blue-500">1.5+</h3>
    <p className="text-gray-300 mt-2">Yillik tajriba</p>
  </div>
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300">
    <h3 className="text-5xl font-bold text-green-500">20+</h3>
    <p className="text-gray-300 mt-2">Tugatgan loyiha</p>
  </div>
  <div className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-98 transition-transform duration-300">
    <h3 className="text-5xl font-bold text-yellow-500">99%</h3>
    <p className="text-gray-300 mt-2">Mijozlar qoniqishi</p>
  </div>
  
</div>


<div className="text">
    <p className="text-center text-xl">Siz ham hoziroq IT yechimlarimizdan foydalaning va ishlaringizni osonlashtiring!</p>
  <br />
  <p className="text-center text-lg">Hoziroq bizga ariza qoldiring!</p>
</div>
<div className="flex justify-center items-center mt-20 mb-20">
<a href="#ariza"><button className="flex justify-center items-center bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-white">Ariza qoldirish!</button></a>
</div>
















<Ariza/>










     






















     <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">

      
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            IT Solutions
          </h3>
          <p className="text-sm">
            We provide modern IT services and digital solutions.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/services/web">Web Development</a>
            </li>
            <li>
              <a href="/services/security">Cyber Security</a>
            </li>
            <li>
              <a href="/services/ai">AI Solutions</a>
            </li>
            <li>
              <a href="/services/support">IT Support</a>
            </li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="mailto:info@itsolutions.com">
                info@itsolutions.com
              </a>
            </li>
            <li>
              <a href="tel:+998900000000">
                +998 90 000 00 00
              </a>
            </li>
            <li>Tashkent, Uzbekistan</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} IT Solutions. All rights reserved.
      </div>
    </footer>
    </>
  );
}
