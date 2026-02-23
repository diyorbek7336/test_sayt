import { NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"

const rateLimit = new Map<string, { count: number; time: number }>()

export const runtime = "nodejs"

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