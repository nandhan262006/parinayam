import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

export async function GET() {
  const items = await db.review.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await db.review.create({ data });
  revalidateTag("reviews", "max");
  return NextResponse.json(item, { status: 201 });
}
