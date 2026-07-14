import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

const model = db.service;

export async function GET() {
  const items = await model.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const item = await model.create({ data });
  revalidateTag("services", "max");
  return NextResponse.json(item, { status: 201 });
}
