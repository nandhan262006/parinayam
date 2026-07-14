import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.setting.findMany();
  const map: Record<string, string> = {};
  items.forEach((s) => (map[s.key] = s.value));
  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  for (const [key, value] of Object.entries(data)) {
    await db.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  revalidateTag("settings", "max");
  return NextResponse.json({ ok: true });
}
