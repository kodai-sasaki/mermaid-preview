import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { title, body } = requestBody;

    if (typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    if (typeof body !== "string" || body.trim().length === 0) {
      return NextResponse.json({ error: "body is required" }, { status: 400 });
    }

    // Smoke test endpoint: validate payload but do not persist to DB.
    return NextResponse.json(
      {
        message: "POST test request successful (no DB write)",
        data: {
          title,
          body,
          validated: true,
          persisted: false,
        },
      },
      { status: 200 },
    );
  } catch (_error) {
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 },
    );
  }
}
