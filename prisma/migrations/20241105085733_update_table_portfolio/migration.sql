-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "cover" DROP NOT NULL;

-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN     "software" VARCHAR(255),
ALTER COLUMN "company_logo" DROP NOT NULL;
