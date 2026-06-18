import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";

// Persistence strategy:
//   1. If SUBMIT_WEBHOOK_URL is set (Discord/Slack/Zapier/etc.), forward there.
//   2. Otherwise append to a JSON file in the OS temp dir (works on serverless,
//      but ephemeral — set the webhook for durable storage in production).
const STORE = path.join(os.tmpdir(), "apifreely-submissions.json");

// Reject obvious abuse / unsafe content (Product.md §7). Legit free tiers only.
const BLOCKLIST = [
  "multi account",
  "multiple account",
  "multi-account",
  "fake email",
  "bypass limit",
  "reset trial",
  "leaked key",
  "stolen",
  "sk-", // pasted secret-looking keys
];

type Submission = {
  name?: string;
  category?: string;
  sourceUrl?: string;
  signupUrl?: string;
  baseUrl?: string;
  model?: string;
  freeDetails?: string;
};

function isUrl(v?: string) {
  if (!v) return true; // optional fields pass
  try {
    new URL(v);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let body: Submission;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const { name, sourceUrl, freeDetails } = body;
  if (!name?.trim() || !sourceUrl?.trim() || !freeDetails?.trim()) {
    return NextResponse.json(
      { error: "name, source URL and free details are required." },
      { status: 400 },
    );
  }
  if (!isUrl(sourceUrl) || !isUrl(body.signupUrl)) {
    return NextResponse.json({ error: "Please use valid URLs." }, { status: 400 });
  }

  const haystack = JSON.stringify(body).toLowerCase();
  if (BLOCKLIST.some((w) => haystack.includes(w))) {
    return NextResponse.json(
      {
        error:
          "Rejected: looks like trial-abuse or a pasted key. We only accept legit free tiers.",
      },
      { status: 422 },
    );
  }

  const entry = {
    ...body,
    status: "pending",
    submittedAt: new Date().toISOString(),
  };

  const webhook = process.env.SUBMIT_WEBHOOK_URL;
  try {
    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: `New apifreely submission`, entry }),
      });
    } else {
      let list: unknown[] = [];
      try {
        list = JSON.parse(await fs.readFile(STORE, "utf8"));
      } catch {
        // file doesn't exist yet — start fresh
      }
      list.push(entry);
      await fs.writeFile(STORE, JSON.stringify(list, null, 2));
    }
  } catch {
    return NextResponse.json(
      { error: "Could not save right now. Try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    message: "Thanks — your tip is in the moderation queue.",
  });
}
