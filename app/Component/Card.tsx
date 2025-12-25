"use client"

import { useState } from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Users() {
  const [card, setCard] = useState<Service[]>([]);
  const [show, setShow] = useState(false);

  const services: Service[] = [
    {
      id: 1,
      title: "IT Security",
      icon: "https://img.icons8.com/ios-filled/100/ffffff/security-checked.png",
      description: "Tarmoq va tizim xavfsizligini ta'minlaymiz: firewall, penetration testing, monitoring."
    },
    {
      id: 2,
      title: "Automation",
      icon: "https://img.freepik.com/premium-vector/programmable-automation-icon-vector-image-can-be-used-cyberpunk_120816-305414.jpg",
      description: "Tizimlarni avtomatlashtirish va monitoring xizmatlari, IT ops jarayonlarini soddalashtirish."
    },
    {
      id: 3,
      title: "Networking",
      icon: "https://img.icons8.com/ios-filled/100/ffffff/network.png",
      description: "Tarmoqlarni loyihalash va xavfsiz ishlashini ta'minlash: switch, router, VLAN konfiguratsiya."
    },
    {
      id: 4,
      title: "Web Development",
      icon: "https://img.icons8.com/ios-filled/100/ffffff/code.png",
      description: "Frontend va backend tizimlar yaratish: saytlar, API, dashboardlar va integratsiyalar."
    },
    {
      id: 5,
      title: "CCTV & Security",
      icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNnYEY1lD-_EWdYKxbzRkWlksiZOQg4aUmw&s",
      description: "Kameralar va xavfsizlik tizimlarini o‘rnatish, monitoring va qo‘llab-quvvatlash."
    },
    {
      id: 6,
      title: "Cloud Services",
      icon: "https://img.icons8.com/ios-filled/100/ffffff/cloud.png",
      description: "Bulutli serverlar, saqlash va backup yechimlari, virtual infratuzilma boshqaruvi."
    },
  ];

  const addToCard = (service: Service) => {
    setCard(prev => {
      const exists = prev.find(item => item.id === service.id);
      if (exists) return prev;
      return [...prev, service];
    });
  }

  return (
    <>
    
      <section className="bg-gray-900 min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
            Bizning xizmatlar
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <div key={service.id} className="relative bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition cursor-pointer">
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

                <img src={service.icon} className="w-12 h-12 mb-4" alt={service.title} />
                <h3 className="text-lg font-semibold text-white font-mono">{service.title}</h3>
                <p className="text-white text-sm mt-2 italic">{service.description}</p>
                
                <div className="flex justify-between items-center mt-4">
                  <button 
                    className="bg-white text-black px-4 py-2 rounded-xl font-serif hover:bg-gray-200 transition"
                    onClick={() => addToCard(service)}
                  >
                    Xizmatni tanlash
                  </button>
                  <button 
                    className="text-2xl hover:text-blue-400 transition"
                    onClick={() => setShow(true)}
                  >
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {show && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setShow(false)}></div>

         
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-700 rounded-lg p-4 z-50">
            <button 
              onClick={() => setShow(false)} 
              className="text-2xl mb-2 float-right hover:text-red-400 transition"
            >
              ❌
            </button>
            <h2 className="text-xl font-mono mb-4 text-white text-center">Siz tanlagan xizmatlar</h2>
            
            {card.length === 0 ? (
              <p className="text-gray-300 text-center">Hozircha hech narsa tanlanmagan.</p>
            ) : (
              card.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-gray-600 p-3 rounded-lg mb-2">
                  <img src={item.icon} className="w-12 h-12" alt={item.title} />
                  <span className="text-white font-bold">{item.title}</span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </>
  )
}
