import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const notes = await prisma.nota.findMany();

    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title && !content) return console.log("Not title and content");

    const newNote = await prisma.nota.create({
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
