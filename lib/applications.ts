import { readFile, writeFile, mkdir } from "fs/promises"
import path from "path"

export interface ArizaData {
  Ism: string
  Familya: string
  Email: string
  Kompaniya: string
  Telefon: string
  Xabar: string
  "Tanlangan xizmatlar": string
  Vaqt: string
}

const FILENAME = "applications.json"
const getFilePath = () => path.join(process.cwd(), "data", FILENAME)

export async function saveApplication(data: ArizaData): Promise<void> {
  const filePath = getFilePath()
  await mkdir(path.dirname(filePath), { recursive: true })

  let list: (ArizaData & { id: number })[] = []
  try {
    const raw = await readFile(filePath, "utf-8")
    list = JSON.parse(raw)
  } catch {
    list = []
  }

  list.push({
    id: Date.now(),
    ...data,
  })

  await writeFile(filePath, JSON.stringify(list, null, 2), "utf-8")
}
