"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        id,
        passwd,
        redirect: false,
      });

      if (result?.error) {
        switch (result.error) {
          case "CredentialsSignin":
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            break;
          case "UserNotFound":
            alert("존재하지 않는 사용자입니다.");
            break;
          case "AccountLocked":
            alert("계정이 잠겼습니다. 관리자에게 문의하세요.");
            break;
          default:
            alert("로그인 중 오류가 발생했습니다.");
        }
      } else {
        alert("로그인 성공!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block mb-1">
            ID
          </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="passwd" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="passwd"
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
