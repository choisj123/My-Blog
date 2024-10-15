"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function WritePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const checkSubmit = async (e) => {
    e.preventDefault();
    if (status !== "authenticated") {
      alert("로그인 후 이용해주세요.");
      router.push("/login");
      return;
    }

    if (!title || !content) {
      alert("제목과 내용은 필수입니다.");
      return;
    }

    try {
      const response = await axios.post("/api/board", { title, content });

      if (response.status === 201) {
        const newPostId = response.data.post_no;
        alert("게시글이 작성되었습니다.");
        router.push(`/post/${newPostId}`); // 새로 작성된 게시글로 이동
      } else {
        throw new Error("게시글 작성 실패");
      }
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다: " + error.message);
    }
  };

  if (status === "loading") {
    return <div>로딩중...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>
      <form onSubmit={checkSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="content" className="block mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded h-40"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          게시글 작성
        </button>
      </form>
    </div>
  );
}
