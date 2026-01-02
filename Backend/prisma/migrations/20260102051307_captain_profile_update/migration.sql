/*
  Warnings:

  - Added the required column `licenseImageUrl` to the `Captain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseNumber` to the `Captain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleNumber` to the `Captain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Captain" ADD COLUMN     "licenseImageUrl" TEXT NOT NULL,
ADD COLUMN     "licenseNumber" TEXT NOT NULL,
ADD COLUMN     "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vehicleNumber" TEXT NOT NULL;
