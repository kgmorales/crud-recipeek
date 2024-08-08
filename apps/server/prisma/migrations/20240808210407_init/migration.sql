-- CreateTable
CREATE TABLE "lamora"."InstagramLongTermToken" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InstagramLongTermToken_pkey" PRIMARY KEY ("id")
);
