import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { recordAttempt } from "@/lib/db";
import { findChallenge } from "@/content/tree";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.githubId) {
    return NextResponse.json({ error: "unauthenticated" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { challengeId?: unknown; passed?: unknown } | null;
  if (typeof body?.challengeId !== "string" || typeof body.passed !== "boolean" || !findChallenge(body.challengeId)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  return NextResponse.json(recordAttempt(session.user.githubId, body.challengeId, body.passed));
}
