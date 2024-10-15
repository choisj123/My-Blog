-- CreateTable
CREATE TABLE "User" (
    "user_no" SERIAL NOT NULL,
    "id" TEXT NOT NULL,
    "passwd" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "img_url" TEXT NOT NULL DEFAULT '/uploads/default-profile.png',
    "create_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_no")
);

-- CreateTable
CREATE TABLE "Post" (
    "post_no" SERIAL NOT NULL,
    "user_no" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "create_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(3),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("post_no")
);

-- CreateTable
CREATE TABLE "Comment" (
    "comment_no" SERIAL NOT NULL,
    "post_no" INTEGER NOT NULL,
    "user_no" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "create_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_dt" TIMESTAMP(3),

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "User"("user_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_no_fkey" FOREIGN KEY ("post_no") REFERENCES "Post"("post_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_user_no_fkey" FOREIGN KEY ("user_no") REFERENCES "User"("user_no") ON DELETE RESTRICT ON UPDATE CASCADE;
