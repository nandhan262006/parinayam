import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireApiAuth } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireApiAuth();
  if (authError) return authError;
  const { id } = await params;
  const data = await req.json();
  const item = await db.gallery.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireApiAuth();
  if (authError) return authError;
  const { id } = await params;
  await db.gallery.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
