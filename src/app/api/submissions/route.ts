import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await db.submission.create({ data });
    return NextResponse.json({ ok: true, message: "Thank you! We'll get back to you soon." });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
