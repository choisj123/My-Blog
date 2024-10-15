"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Mypage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div className="text-center mt-8">로그인해주세요.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">마이페이지</h1>
      <div className="flex flex-col items-center mb-6">
        {session.user.image ? (
          <Image
            src={session.user.image}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl">{session.user.name[0]}</span>
          </div>
        )}
        <h2 className="text-xl font-semibold mt-4">{session.user.name}</h2>
      </div>
      <div className="space-y-4">
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
          role="alert"
        >
          <p className="font-bold">Coming Soon</p>
          <p>준비중입니다!</p>
        </div>
      </div>
    </div>
  );
}
