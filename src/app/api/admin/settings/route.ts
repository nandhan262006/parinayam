import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";

export async function GET() {
  const items = await db.setting.findMany();
  const map: Record<string, string> = {};
  items.forEach((s) => (map[s.key] = s.value));
  return NextResponse.json(map);
}

export async function POST(req: NextRequest) {
  const authError = await requireApiAuth();
  if (authError) return authError;
  const data = await req.json();
  for (const [key, value] of Object.entries(data)) {
    await db.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  return NextResponse.json({ ok: true });
}
