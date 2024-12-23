/*
  Warnings:

  - You are about to drop the column `created_at` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `link_profile` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `link_social_media` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `link_social_media` table. All the data in the column will be lost.
  - Added the required column `label` to the `link_social_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `link_social_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "link_social_media" DROP COLUMN "created_at",
DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "link_profile",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
DROP COLUMN "updated_at",
DROP COLUMN "youtube",
ADD COLUMN     "label" VARCHAR(100) NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
