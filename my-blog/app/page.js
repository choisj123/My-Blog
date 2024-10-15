import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Link from "next/link";

export default async function Home() {
  const latestPosts = await prisma.post.findMany({
    take: 9,
    orderBy: { create_dt: "desc" },
    include: { user: true },
  });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">최신글</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestPosts.map((post) => (
          <Link
            href={`/post/${post.post_no}`}
            className="text-blue-500 hover:font-bold"
          >
            <div
              key={post.post_no}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    By {post.user.name}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
