import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs/promises";

export async function POST(request) {
  try {
    const data = await request.formData();
    const id = data.get("id");
    const passwd = data.get("passwd");
    const name = data.get("name");
    const profile = data.get("profile");

    // 필수 필드 확인
    if (!id || !passwd || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(passwd, 10);

    let img_url = "default-profile.png"; // 기본 이미지 경로

    if (profile && profile instanceof Blob) {
      const bytes = await profile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // 파일 이름 생성 (현재 시간 이용)
      const fileName = `${Date.now()}-${profile.name}`;
      // 'uploads' 폴더 내에 저장
      const filePath = path.join("uploads", fileName);

      // 'public/uploads' 폴더가 없으면 생성
      const fullPath = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(fullPath, { recursive: true });

      // 파일 저장
      await writeFile(path.join(fullPath, fileName), buffer);

      // DB에 저장할 경로
      img_url = `/uploads/${fileName}`;
    }

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        id,
        passwd: hashedPassword,
        name,
        img_url,
        is_admin: false,
        create_dt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "회원가입 성공",
        user: { id: user.id, name: user.name },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 실패:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "이미 존재하는 아이디입니다." },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "회원가입 실패" }, { status: 500 });
  }
}
