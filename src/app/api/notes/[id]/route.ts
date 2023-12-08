import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  try {
    const note = await prisma.nota.findFirst({
      where: {
        id: Number(params.id),
      },
    });

    if (!note)
      return NextResponse.json({ msg: "Note not fund" }, { status: 404 });

    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const deletedNote = await prisma.nota.delete({
      where: {
        id: Number(params.id),
      },
    });

    if (!deletedNote)
      return NextResponse.json({ msg: "Note not fund" }, { status: 404 });

    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json(error, { status: 404 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { title, content } = await req.json();

    const updatedNote = await prisma.nota.update({
      where: {
        id: Number(params.id),
      },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
