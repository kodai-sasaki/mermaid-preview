import { NextResponse } from "next/server";
import prisma from "@/src/prisma/core";

export async function GET() {
  try {
    const documents = await prisma.document.findMany();

    return NextResponse.json({
      message: "GET request successful",
      data: documents,
    });
  } catch (_error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
