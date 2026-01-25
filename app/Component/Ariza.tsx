'use client'

import { useState } from "react"
import { useSelectedServices } from "../context/SelectedServicesContext"

export default function Ariza() {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [input3, setInput3] = useState("")
  const [input4, setInput4] = useState("")
  const [input5, setInput5] = useState("")
  const [textarea, setTextarea] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { selectedServices, clearServices } = useSelectedServices()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input1 || !input2 || !input3 || !input4 || !input5 || !textarea) {
      alert("Iltimos, barcha maydonlarni to'ldiring!")
      return
    }

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID
    if (!formId) {
      alert(
        "Formspree sozlanmagan. Loyiha ildizida .env.local yarating va qo'shing:\nNEXT_PUBLIC_FORMSPREE_ID=your_form_id\n\nformspree.io saytida bepul form yarating va ID ni oling."
      )
      return
    }

    const tanlangan = selectedServices.length
      ? selectedServices.map((s) => s.title).join(", ")
      : "—"

    const data = {
      Ism: input1,
      Familya: input2,
      Email: input3,
      Kompaniya: input4,
      Telefon: input5,
      Xabar: textarea,
      "Tanlangan xizmatlar": tanlangan,
      Vaqt: new Date().toLocaleString("uz-UZ"),
    }

    setIsSubmitting(true)
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || "Server xatosi")
      }

      alert("Ariza muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.")
      setInput1("")
      setInput2("")
      setInput3("")
      setInput4("")
      setInput5("")
      setTextarea("")
      clearServices()
    } catch (err) {
      console.error(err)
      alert("Ariza yuborilmadi. Internet aloqangizni tekshiring yoki keyinroq urinib ko'ring.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-32 bg-gray-900" id="ariza">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl text-white font-bold mb-8">Xizmatlar uchun ariza qoldirish!</h2>

        {selectedServices.length > 0 && (
          <p className="text-gray-400 mb-4 text-sm">
            Tanlangan: {selectedServices.map((s) => s.title).join(", ")}
          </p>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ismingiz"
            className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            disabled={isSubmitting}
          />
          <input
            type="text"
            placeholder="Familyangiz"
            className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            disabled={isSubmitting}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
            disabled={isSubmitting}
          />
          <input
            type="text"
            placeholder="Kompaniyangiz nomi"
            className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"
            value={input4}
            onChange={(e) => setInput4(e.target.value)}
            disabled={isSubmitting}
          />
          <input
            type="tel"
            placeholder="Telefon raqamingiz"
            className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"
            value={input5}
            onChange={(e) => setInput5(e.target.value)}
            disabled={isSubmitting}
          />
          <textarea
            placeholder="Xabar yuborish..."
            className="w-full p-3 rounded-lg bg-gray-800/80 text-white border border-gray-700"
            value={textarea}
            onChange={(e) => setTextarea(e.target.value)}
            disabled={isSubmitting}
            rows={4}
          />
          <button
            type="submit"
            className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
          </button>
        </form>
      </div>
    </section>
  )
}
