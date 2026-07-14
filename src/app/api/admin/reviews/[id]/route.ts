import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const item = await db.review.update({ where: { id }, data });
  revalidateTag("reviews", "max");
  return NextResponse.json(item);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.review.delete({ where: { id } });
  revalidateTag("reviews", "max");
  return NextResponse.json({ ok: true });
}
