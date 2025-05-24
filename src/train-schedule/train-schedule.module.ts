import { Module } from '@nestjs/common';
import { TrainScheduleService } from './train-schedule.service';
import { TrainScheduleController } from './train-schedule.controller';

@Module({
  controllers: [TrainScheduleController],
  providers: [TrainScheduleService],
})
export class TrainScheduleModule {}
