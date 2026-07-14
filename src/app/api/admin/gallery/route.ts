import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.gallery.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await db.gallery.create({ data });
  revalidateTag("galleries", "max");
  return NextResponse.json(item, { status: 201 });
}
