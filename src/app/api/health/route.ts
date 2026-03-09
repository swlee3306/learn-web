import { NextResponse } from "next/server";

// Lightweight health check for external smoke tests.
// Keep it dependency-free and fast.
export async function GET() {
  return NextResponse.json({ ok: true, ts: Date.now() }, { status: 200 });
}
