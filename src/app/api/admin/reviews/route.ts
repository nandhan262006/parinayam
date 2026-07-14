import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  const items = await db.review.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await requireAuth();
  const data = await req.json();
  const item = await db.review.create({ data });
  return NextResponse.json(item, { status: 201 });
}
