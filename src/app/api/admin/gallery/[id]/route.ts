import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const item = await db.gallery.update({ where: { id }, data });
  revalidateTag("galleries", "max");
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.gallery.delete({ where: { id } });
  revalidateTag("galleries", "max");
  return NextResponse.json({ ok: true });
}
