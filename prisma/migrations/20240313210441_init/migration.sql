-- CreateTable
CREATE TABLE "UserResult" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "result" JSONB[],

    CONSTRAINT "UserResult_pkey" PRIMARY KEY ("id")
);
