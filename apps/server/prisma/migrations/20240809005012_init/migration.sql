-- AlterTable
ALTER TABLE "lamora"."InstagramLongTermToken" ADD COLUMN     "lastRefreshedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
