/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "imagePublicUrl" TEXT;

-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "imageCoverPublicUrl" TEXT,
ADD COLUMN     "imageCoverUrl" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image";
