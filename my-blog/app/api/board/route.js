import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { user: true },
      orderBy: { create_dt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수입니다." },
        { status: 400 }
      );
    }

    console.log("Session:", JSON.stringify(session, null, 2));

    const post = await prisma.post.create({
      data: {
        title,
        content,
        user: { connect: { user_no: parseInt(session.user.userNo) } },
        create_dt: new Date(),
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("게시글 작성 실패 :", error);
    return NextResponse.json({ error: "게시글 작성 실패" }, { status: 500 });
  }
}
