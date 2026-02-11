"use client"

import { useState } from "react"
import { useSelectedServices, type Service } from "../context/SelectedServicesContext"

const services: Service[] = [
  {
    id: 1,
    title: "IT Security",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/security-checked.png",
    description:
      "Tarmoq va tizim xavfsizligini ta'minlaymiz: firewall, penetration testing, monitoring.",
  },
  {
    id: 2,
    title: "Automation",
    icon: "https://img.freepik.com/premium-vector/programmable-automation-icon-vector-image-can-be-used-cyberpunk_120816-305414.jpg",
    description:
      "Tizimlarni avtomatlashtirish va monitoring xizmatlari, IT ops jarayonlarini soddalashtirish.",
  },
  {
    id: 3,
    title: "Networking",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/network.png",
    description:
      "Tarmoqlarni loyihalash va xavfsiz ishlashini ta'minlash: switch, router, VLAN konfiguratsiya.",
  },
  {
    id: 4,
    title: "Web Development",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/code.png",
    description:
      "Frontend va backend tizimlar yaratish: saytlar, API, dashboardlar va integratsiyalar.",
  },
  {
    id: 5,
    title: "CCTV & Security",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUNnYEY1lD-_EWdYKxbzRkWlksiZOQg4aUmw&s",
    description:
      "Kameralar va xavfsizlik tizimlarini o'rnatish, monitoring va qo'llab-quvvatlash.",
  },
  {
    id: 6,
    title: "Cloud Services",
    icon: "https://img.icons8.com/ios-filled/100/ffffff/cloud.png",
    description:
      "Bulutli serverlar, saqlash va backup yechimlari, virtual infratuzilma boshqaruvi.",
  },
]

export default function Card() {
  const [show, setShow] = useState(false)
  const { selectedServices, addService, removeService } = useSelectedServices()

  // Xizmat tanlangan yoki yo'qligini tekshirish
  const isServiceSelected = (serviceId: number) => {
    return selectedServices.some(service => service.id === serviceId)
  }

  // Xizmatni tanlash yoki olib tashlash
  const handleServiceToggle = (service: Service) => {
    if (isServiceSelected(service.id)) {
      removeService(service.id)
    } else {
      addService(service)
    }
  }

  // Har bir xizmat uchun alohida sanani ko'rsatish
  const getServiceCount = (serviceId: number) => {
    return selectedServices.filter(service => service.id === serviceId).length
  }

  return (
    <>
      <section className="bg-gray-900 min-h-screen p-6 sm:p-8 pt-8 sm:pt-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-12 text-center">
            Bizning xizmatlar
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const isSelected = isServiceSelected(service.id)
              
              return (
                <div
                  key={service.id}
                  className={`relative p-6 rounded-2xl transition cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-700 hover:bg-blue-600' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

                  <img src={service.icon} className="w-12 h-12 mb-4" alt={service.title} />
                  <h3 className="text-lg font-semibold text-white font-mono">{service.title}</h3>
                  <p className="text-white text-sm mt-2 italic">{service.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      className={`px-4 py-2 rounded-xl font-serif transition ${
                        isSelected
                          ? 'bg-white text-blue-700 hover:bg-gray-200'
                          : 'bg-white text-black hover:bg-gray-200'
                      }`}
                      onClick={() => handleServiceToggle(service)}
                    >
                      {isSelected ? '✓ Tanlangan' : 'Xizmatni tanlash'}
                    </button>
                    <button
                      className="text-2xl hover:text-blue-400 transition relative"
                      onClick={() => setShow(true)}
                      title="Tanlangan xizmatlar"
                    >
                      🛒 
                      {getServiceCount(service.id) > 0 && (
                        <span className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                          {getServiceCount(service.id)}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {show && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={() => setShow(false)}
          />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 max-h-[80vh] overflow-y-auto bg-gray-700 rounded-lg p-4 z-50">
            <button
              onClick={() => setShow(false)}
              className="text-2xl mb-2 float-right hover:text-red-400 transition"
            >
              ❌
            </button>
            <h2 className="text-xl font-mono mb-4 text-white text-center">
              Siz tanlagan xizmatlar
            </h2>

            {selectedServices.length === 0 ? (
              <p className="text-gray-300 text-center">Hozircha hech narsa tanlanmagan.</p>
            ) : (
              <div className="space-y-2">
                {selectedServices.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-2 bg-gray-600 p-3 rounded-lg"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.icon} className="w-10 h-10 shrink-0" alt={item.title} />
                      <span className="text-white font-bold truncate">{item.title}</span>
                    </div>
                    <button
                      onClick={() => removeService(item.id)}
                      className="text-red-400 hover:text-red-300 shrink-0"
                      title="O'chirish"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                
                 <a href="#ariza"
                  onClick={() => setShow(false)}
                  className="block mt-4 text-center py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white text-sm"
                >
                  Ariza qoldirish →
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}