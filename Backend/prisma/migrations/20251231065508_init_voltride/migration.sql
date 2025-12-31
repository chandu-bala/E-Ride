-- CreateEnum
CREATE TYPE "RideRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "RideStatus" AS ENUM ('ASSIGNED', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "CancelledBy" AS ENUM ('USER', 'CAPTAIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "lastKnownLat" DOUBLE PRECISION,
    "lastKnownLng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Captain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "batteryPercent" INTEGER,
    "totalIncome" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalTrips" INTEGER NOT NULL DEFAULT 0,
    "cancelledTrips" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Captain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "captainId" TEXT NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "batteryCapacity" INTEGER,
    "lastServiceDate" TIMESTAMP(3),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pickupLat" DOUBLE PRECISION NOT NULL,
    "pickupLng" DOUBLE PRECISION NOT NULL,
    "dropLat" DOUBLE PRECISION NOT NULL,
    "dropLng" DOUBLE PRECISION NOT NULL,
    "estimatedDistance" DOUBLE PRECISION NOT NULL,
    "estimatedFare" DOUBLE PRECISION NOT NULL,
    "status" "RideRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RideRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" TEXT NOT NULL,
    "rideRequestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "captainId" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "actualDistance" DOUBLE PRECISION,
    "finalFare" DOUBLE PRECISION,
    "status" "RideStatus" NOT NULL DEFAULT 'ASSIGNED',

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaptainLocation" (
    "id" TEXT NOT NULL,
    "captainId" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaptainLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaptainEarning" (
    "id" TEXT NOT NULL,
    "captainId" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaptainEarning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RideCancellation" (
    "id" TEXT NOT NULL,
    "rideId" TEXT NOT NULL,
    "cancelledBy" "CancelledBy" NOT NULL,
    "reason" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RideCancellation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Captain_phoneNumber_key" ON "Captain"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_captainId_key" ON "Vehicle"("captainId");

-- CreateIndex
CREATE UNIQUE INDEX "Ride_rideRequestId_key" ON "Ride"("rideRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "RideCancellation_rideId_key" ON "RideCancellation"("rideId");

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideRequest" ADD CONSTRAINT "RideRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_rideRequestId_fkey" FOREIGN KEY ("rideRequestId") REFERENCES "RideRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaptainLocation" ADD CONSTRAINT "CaptainLocation_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaptainEarning" ADD CONSTRAINT "CaptainEarning_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "Captain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RideCancellation" ADD CONSTRAINT "RideCancellation_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
