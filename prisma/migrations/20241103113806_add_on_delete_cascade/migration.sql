-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_blog_id_fkey";

-- DropIndex
DROP INDEX "comments_email_key";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
