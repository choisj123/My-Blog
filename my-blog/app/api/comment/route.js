import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
  }

  const { content, post_no } = await request.json();

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { post_no: post_no } },
        user: { connect: { user_no: parseInt(session.user.userNo) } },
        create_dt: new Date(),
      },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("댓글 작성 실패:", error);
    return NextResponse.json({ error: "댓글 작성 실패" }, { status: 500 });
  }
}
