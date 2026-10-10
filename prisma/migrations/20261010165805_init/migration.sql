/*
  Warnings:

  - Added the required column `updatedAt` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "category_resturantId_idx" ON "category"("resturantId");

-- CreateIndex
CREATE INDEX "item_categoryId_idx" ON "item"("categoryId");

-- CreateIndex
CREATE INDEX "item_isAvailable_idx" ON "item"("isAvailable");

-- CreateIndex
CREATE INDEX "item_categoryId_isAvailable_idx" ON "item"("categoryId", "isAvailable");

-- CreateIndex
CREATE INDEX "restaurant_userId_idx" ON "restaurant"("userId");
