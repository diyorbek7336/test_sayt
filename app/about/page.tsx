import Header from "../Component/Header"
import Link from "next/link"

export default function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 font-mono">Biz haqimizda</h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            <strong>Server IT uz</strong> — Toshkentda professional IT xizmatlarni taqdim etuvchi jamoa.
            Web development, tarmoq xavfsizligi, avtomatlashtirish va CCTV tizimlari bo‘yicha 1.5 yildan
            ortiq tajribaga egamiz.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Bizning maqsadimiz — mijozlarning biznes jarayonlarini soddalashtirish va ularning
            ma’lumotlarini xavfsiz ushlab turish. Hotel Inspera-S, Cambridge Learning Center, Colba,
            Mars IT school, DataLab, Gigu Fashion School kabi tashkilotlar bizga ishonishadi.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-10">
            Siz ham IT yechimlarimizdan foydalanmoqchi bo‘lsangiz, bepul konsultatsiya olish uchun
            biz bilan bog‘laning.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#cards"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full transition"
            >
              Xizmatlar
            </Link>
            <Link
              href="/#ariza"
              className="px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full transition"
            >
              Ariza qoldirish
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-500 hover:border-white rounded-full transition"
            >
              Aloqa
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
