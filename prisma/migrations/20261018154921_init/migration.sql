/*
  Warnings:

  - You are about to drop the column `subscriptionEnd` on the `restaurant` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'SYP');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'EXPIRED', 'CANCELED');

-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "subscriptionEnd";

-- CreateTable
CREATE TABLE "subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "frequency" "Frequency" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renewalDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "restaurantId" TEXT NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subscription_restaurantId_key" ON "subscription"("restaurantId");

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
