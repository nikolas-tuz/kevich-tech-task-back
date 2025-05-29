-- CreateIndex
CREATE INDEX "TrainSchedule_trainNumber_departureStation_arrivalStation_c_idx" ON "TrainSchedule"("trainNumber", "departureStation", "arrivalStation", "createdAt", "status");
