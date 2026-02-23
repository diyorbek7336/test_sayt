import { NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"

const rateLimit = new Map<string, { count: number; time: number }>()

export const runtime = "nodejs"

const SYSTEM_PROMPT = `Siz ServerITuz kompaniyasining AI yordamchisisiz.

KOMPANIYA MA'LUMOTLARI:
- Nomi: ServerITuz
- Telefon: +998 95 011 99 53
- Manzil: Uzbekistan, Tashkent
- Veb-sayt: serverituz.uz

XIZMATLAR:
1. IT Security — Tarmoq va tizim xavfsizligi: firewall, penetration testing, monitoring
2. AD DS / Active Directory — Foydalanuvchilar, guruhlar va qurilmalarni markazlashtirilgan boshqaruv: GPO, DNS, DHCP integratsiyasi
3. Automation — Tizimlarni avtomatlashtirish va monitoring, IT ops jarayonlarini soddalashtirish
4. Networking — Tarmoqlarni loyihalash va xavfsiz ishlashini ta'minlash: switch, router, VLAN konfiguratsiya
5. Web Development — Frontend va backend tizimlar: saytlar, API, dashboardlar va integratsiyalar
6. CCTV & Security — Kameralar va xavfsizlik tizimlarini o'rnatish, monitoring va qo'llab-quvvatlash
7. Cloud Services — Bulutli serverlar, saqlash va backup yechimlari, virtual infratuzilma boshqaruvi
8. IP Telefoniya — VoIP va IP-telefoniya: Cisco, Asterisk, FreePBX; ichki va tashqi chaqiruvlarni boshqarish
9. Face ID — Davomat — Xodimlarning keldi-ketdisini yuz tanish texnologiyasi orqali kuzatish, HR integratsiyasi

QOIDALAR:
- Foydalanuvchi qaysi tilda yozsa, o'sha tilda javob bering (o'zbekcha, ruscha yoki inglizcha)
- Haqiqiy, foydali va aniq texnik javoblar bering
- Agar savol kompaniya xizmatlari haqida bo'lsa, batafsil tushuntiring
- Agar muammo murakkab bo'lsa, bog'lanishni tavsiya qiling: +998 95 011 99 53
- Hech qachon yolg'on ma'lumot bermang
- Qisqa va aniq javob bering, kerak bo'lsa ro'yxat ko'rinishida
- Siz faqat ServerITuz vakili sifatida gapirasiz`

// ─── CHAT endpoint ────────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({ status: "ok" })
}

export async function PUT(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "messages majburiy" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "API key topilmadi" }, { status: 500 })
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return NextResponse.json({ error: "Claude API xatosi: " + err }, { status: 500 })
    }

    const data = await response.json()
    const text = data.content?.[0]?.text ?? "Javob olishda xato yuz berdi."

    return NextResponse.json({ reply: text })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Noma'lum xato"
    return NextResponse.json({ error: "Server xatosi: " + message }, { status: 500 })
  }
}

// ─── FORM submission endpoint ─────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown"

    const now = Date.now()
    const limit = rateLimit.get(ip)
    const FIVE_MINUTES = 5 * 60 * 1000

    if (limit) {
      if (now - limit.time < FIVE_MINUTES) {
        if (limit.count >= 3) {
          return NextResponse.json(
            { error: "Juda ko'p urinish! 5 daqiqadan keyin qayta urinib ko'ring." },
            { status: 429 }
          )
        }
        rateLimit.set(ip, { count: limit.count + 1, time: limit.time })
      } else {
        rateLimit.set(ip, { count: 1, time: now })
      }
    } else {
      rateLimit.set(ip, { count: 1, time: now })
    }

    const body = await req.json()

    const data = {
      Ism: String(body.Ism ?? "").trim(),
      Email: String(body.Email ?? "").trim(),
      Kompaniya: String(body.Kompaniya ?? "").trim(),
      Telefon: String(body.Telefon ?? "").trim(),
      Xabar: String(body.Xabar ?? "").trim(),
      "Tanlangan xizmatlar": String(body["Tanlangan xizmatlar"] ?? "—").trim(),
      Vaqt: String(body.Vaqt ?? new Date().toLocaleString("uz-UZ")).trim(),
    }

    if (!data.Ism || !data.Email || !data.Telefon || !data.Xabar) {
      return NextResponse.json(
        { error: "Ma'lumotlar to'liq emas" },
        { status: 400 }
      )
    }

    const filePath = path.join(process.cwd(), "data", "applications.json")
    await mkdir(path.dirname(filePath), { recursive: true })

    let list: unknown[] = []
    try {
      const raw = await readFile(filePath, "utf-8")
      list = JSON.parse(raw) as unknown[]
    } catch {
      list = []
    }

    list.push({ id: Date.now(), ip, ...data })
    await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8")

    return NextResponse.json({ success: true, message: "Ariza qabul qilindi" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Noma'lum xato"
    console.error("API xatosi:", err)
    return NextResponse.json(
      { error: "Server xatosi: " + message },
      { status: 500 }
    )
  }
}