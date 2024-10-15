"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function PostDetail({ params }) {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    getPost();
  }, [params.id]);

  const getPost = async () => {
    try {
      const response = await axios.get(`/api/post/${params.id}`);
      setPost(response.data);
      setEditTitle(response.data.title);
      setEditContent(response.data.content);
    } catch (error) {
      console.error("게시글 불러오기 실패:", error);
    }
  };

  const checkCommentSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert("댓글을 작성하려면 로그인이 필요합니다.");
      return;
    }
    if (!comment) {
      alert("댓글을 작성해주세요.");
      return;
    }
    try {
      await axios.post("/api/comment", {
        content: comment,
        post_no: parseInt(params.id),
      });
      setComment("");
      getPost();
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const DeletePost = async () => {
    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/post/${params.id}`);
        alert("게시글이 삭제되었습니다.");
        router.push("/board");
      } catch (error) {
        console.error("게시글 삭제 실패:", error);
        alert("게시글 삭제에 실패했습니다.");
      }
    }
  };

  const EditPost = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/post/${post.post_no}`, {
        title: editTitle,
        content: editContent,
      });
      setIsEditing(false);
      getPost();
    } catch (error) {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  if (!post) {
    return <div>로딩 중...</div>;
  }

  const isAuthor = session?.user?.userNo === post.user_no.toString();
  const isAdmin = session?.user?.isAdmin;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {isEditing ? (
        <form onSubmit={EditPost} className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border rounded h-40"
          ></textarea>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              수정 완료
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            {(isAuthor || isAdmin) && (
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  수정
                </button>
                <button
                  onClick={DeletePost}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-4">
            작성자: {post.user.name} | 작성일:{" "}
            {new Date(post.create_dt).toLocaleDateString()}
          </p>
          <div className="prose mb-6">{post.content}</div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div
              key={comment.comment_no}
              className="bg-gray-100 p-4 mb-4 rounded"
            >
              <p>{comment.content}</p>
              <p className="text-sm text-gray-600 mt-2">
                By {comment.user.name} on{" "}
                {new Date(comment.create_dt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}

        <form onSubmit={checkCommentSubmit} className="mt-6">
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            댓글 작성
          </button>
        </form>
      </div>
    </div>
  );
}
