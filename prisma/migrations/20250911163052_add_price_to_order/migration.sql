/*
  Warnings:

  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "public"."OrderProduct" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;
