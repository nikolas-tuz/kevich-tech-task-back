/*
  Warnings:

  - Added the required column `status` to the `TrainSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainSchedule" ADD COLUMN     "status" TEXT NOT NULL;
