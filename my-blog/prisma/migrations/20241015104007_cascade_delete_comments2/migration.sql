-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_no_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_no_fkey" FOREIGN KEY ("post_no") REFERENCES "Post"("post_no") ON DELETE CASCADE ON UPDATE CASCADE;
