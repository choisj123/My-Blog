"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const Logout = async () => {
    await signOut({ redirect: false });
    alert("로그아웃되었습니다.");
    router.push("/");
    router.refresh();
  };

  const refresh = () => {
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-gray-900">
            <Link
              href="/"
              onClick={refresh}
              className="hover:text-blue-500 transition duration-300"
            >
              My Blog
            </Link>
          </h1>
          <nav className="space-x-6 hidden md:block">
            <Link
              href="/"
              onClick={refresh}
              className="text-gray-700 hover:text-blue-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              href="/board"
              className="text-gray-700 hover:text-blue-500 transition duration-300"
            >
              Board
            </Link>
            {session && (
              <Link
                href="/mypage"
                className="text-gray-700 hover:text-blue-500 transition duration-300"
              >
                My Page
              </Link>
            )}
          </nav>
        </div>
        <div className="space-x-4 flex items-center">
          {session ? (
            <>
              <Link
                href="/mypage"
                className="text-gray-700 hover:text-blue-500 transition duration-300"
              >
                <div className="flex items-center space-x-2">
                  {session.user.image && (
                    <Image
                      src={
                        session.user.image.startsWith("http")
                          ? session.user.image
                          : `${session.user.image}`
                      }
                      alt="Profile"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span>{session.user.name}</span>
                </div>
              </Link>
              <button
                onClick={Logout}
                className="text-gray-700 hover:text-blue-500 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-500 transition duration-300"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-500 transition duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
