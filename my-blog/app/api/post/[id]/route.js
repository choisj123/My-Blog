import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
  }

  const postId = parseInt(params.id);
  const { title, content } = await request.json();

  try {
    const post = await prisma.post.findUnique({ where: { post_no: postId } });
    if (!post) {
      return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { user_no: parseInt(session.user.userNo) },
    });

    if (post.user_no !== parseInt(session.user.userNo) && !user.is_admin) {
      return NextResponse.json({ error: "권한 없음" }, { status: 401 });
    }

    const updatedPost = await prisma.post.update({
      where: { post_no: postId },
      data: { title, content, update_dt: new Date() },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("게시글 수정 실패:", error);
    return NextResponse.json({ error: "게시글 수정 실패" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "로그인 필요" }, { status: 401 });
  }

  const postId = parseInt(params.id);

  try {
    const post = await prisma.post.findUnique({ where: { post_no: postId } });
    if (!post) {
      return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: { user_no: parseInt(session.user.userNo) },
    });

    if (post.user_no !== parseInt(session.user.userNo) && !user.is_admin) {
      return NextResponse.json({ error: "권한 없음" }, { status: 401 });
    }

    await prisma.post.delete({ where: { post_no: postId } });

    return NextResponse.json({ message: "게시글 삭제 성공" });
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    return NextResponse.json({ error: "게시글 삭제 실패" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  const postNo = parseInt(params.id);

  try {
    const post = await prisma.post.findUnique({
      where: { post_no: postNo },
      include: {
        user: true,
        comments: {
          include: { user: true },
          orderBy: { create_dt: "desc" },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: "게시글 없음" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "게시글 불러오기 실패" },
      { status: 500 }
    );
  }
}
