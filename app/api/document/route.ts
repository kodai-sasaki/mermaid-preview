import { NextRequest, NextResponse } from "next/server";
import prisma from "@/src/prisma/core";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const document = await prisma.document.findUnique({
      where: { id: Number(id) },
    });
    if (!document) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(document);
  } catch (_error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { title, body } = requestBody;
    const newDocument = await prisma.document.create({
      data: { title, body },
    });

    return NextResponse.json(
      { message: "POST request successful", data: newDocument },
      { status: 201 },
    );
  } catch (_error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const { id, title, body } = requestBody;
    const updatedDocument = await prisma.document.update({
      where: { id: Number(id) },
      data: { title, body },
    });

    return NextResponse.json(
      { message: "PUT request successful", data: updatedDocument },
      { status: 200 },
    );
  } catch (_error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
