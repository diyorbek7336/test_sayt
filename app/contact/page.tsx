import Header from "../Component/Header"
import Link from "next/link"

export default function Contact() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 font-mono">Biz bilan bogʻlaning</h1>
          <p className="text-gray-300 text-lg mb-12">
            Savollar yoki xizmatlar bo‘yicha so‘rov qoldirmoqchi bo‘lsangiz, quyidagi orqali yoki
            ariza formasidan foydalaning.
          </p>

          <div className="space-y-6 text-left bg-gray-800/50 rounded-2xl p-8">
            <div>
              <h3 className="text-white font-semibold mb-1">Email</h3>
              <a
                href="#"
                className="text-blue-400 hover:underline"
              >
                info@itsolutions.com
              </a>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Telefon</h3>
              <a href="tel:+998900000000" className="text-blue-400 hover:underline">
                +998 94 204 91 07
              </a>
              <br />
              <a href="tel:+998900000000" className="text-blue-400 hover:underline">
                +998 95 011 99 53
              </a>              
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Manzil</h3>
              <p className="text-gray-300">Toshkent, O‘zbekiston</p>
            </div>
          </div>

          <p className="text-gray-400 mt-8 mb-4">
            Yoki to‘liq ariza qoldiring — tez orada qayta qo‘ng‘iroq qilamiz.
          </p>
          <Link
            href="/#ariza"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-full transition"
          >
            Ariza qoldirish
          </Link>
        </div>
      </main>
    </>
  )
}
