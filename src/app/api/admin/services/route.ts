import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

const model = db.service;

export async function GET() {
  const items = await model.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await requireAuth();
  const data = await req.json();
  const item = await model.create({ data });
  return NextResponse.json(item, { status: 201 });
}
