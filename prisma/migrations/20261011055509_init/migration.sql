/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QrSetting" (
    "id" TEXT NOT NULL,
    "qrColor" TEXT NOT NULL DEFAULT '#0f172a',
    "qrLogo" TEXT,
    "qrSubtitle" TEXT NOT NULL DEFAULT 'امسح الكود لتصفح القائمة',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "QrSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrSetting_restaurantId_key" ON "QrSetting"("restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_slug_key" ON "restaurant"("slug");

-- AddForeignKey
ALTER TABLE "QrSetting" ADD CONSTRAINT "QrSetting_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
