/*
  Warnings:

  - You are about to drop the column `icon` on the `restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `iconPublicUrl` on the `restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "icon",
DROP COLUMN "iconPublicUrl",
ADD COLUMN     "logo" TEXT,
ADD COLUMN     "logoPublicUrl" TEXT;
