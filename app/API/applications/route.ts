import { NextResponse } from "next/server"
import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"


export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const data = {
      Ism: String(body.Ism ?? body.ism ?? "").trim(),
      Email: String(body.Email ?? body.email ?? "").trim(),
      Kompaniya: String(body.Kompaniya ?? body.kompaniya ?? "").trim(),
      Telefon: String(body.Telefon ?? body.telefon ?? "").trim(),
      Xabar: String(body.Xabar ?? body.xabar ?? "").trim(),
      "Tanlangan xizmatlar": String(
        body["Tanlangan xizmatlar"] ?? body.services ?? "—"
      ).trim(),
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

    list.push({
      id: Date.now(),
      ...data,
    })

    await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8")

    return NextResponse.json({ success: true, message: "Ariza qabul qilindi" })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Noma'lum xato"
    console.error("API applications POST xatosi:", err)
    return NextResponse.json(
      { error: "Server xatosi: " + message },
      { status: 500 }
    )
  }
}
