import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

function getSubscribers(): string[] {
  try {
    if (fs.existsSync(SUBSCRIBERS_FILE)) {
      return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
    }
  } catch {
    // If file is corrupted, start fresh
  }
  return [];
}

function saveSubscribers(subscribers: string[]) {
  fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const subscribers = getSubscribers();

    if (subscribers.includes(normalizedEmail)) {
      return NextResponse.json(
        { message: "Already subscribed" },
        { status: 200 }
      );
    }

    subscribers.push(normalizedEmail);
    saveSubscribers(subscribers);

    return NextResponse.json(
      { message: "Successfully subscribed" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
