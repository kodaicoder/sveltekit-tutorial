-- CreateTable
CREATE TABLE "ToDos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "isDone" BOOLEAN NOT NULL DEFAULT false,
    "createBy" TEXT NOT NULL
);
