"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Board() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get("/api/board");
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 불러오기 실패:", error);
      }
    }
    getPosts();
  }, []);

  const checkBtnNewPost = () => {
    if (status === "authenticated") {
      router.push("/post/write");
    } else {
      alert("로그인 후 이용해주세요.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">글 목록</h2>
          <button
            onClick={checkBtnNewPost}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            글쓰기
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">NO</th>
                <th className="py-2 px-4 border-b text-left">TITLE</th>
                <th className="py-2 px-4 border-b text-left">AUTHOR</th>
                <th className="py-2 px-4 border-b text-left">DATE</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idex) => (
                <tr key={post.post_no} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{posts.length - idex}</td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/post/${post.post_no}`}>{post.title}</Link>
                  </td>
                  <td className="py-2 px-4 border-b">{post.user.name}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(post.create_dt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
