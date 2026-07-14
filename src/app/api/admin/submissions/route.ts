import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.submission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function DELETE() {
  await db.submission.deleteMany();
  return NextResponse.json({ ok: true });
}
