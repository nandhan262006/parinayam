import { NextRequest, NextResponse } from "next/server";
import { setSession, getSessionPasswordHash, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD || "admin";

  if (!verifyPassword(password, getSessionPasswordHash())) {
    // Check against raw env var
    if (password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  }

  await setSession(getSessionPasswordHash());
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ ok: true });
}
