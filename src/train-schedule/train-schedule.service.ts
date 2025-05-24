import { Injectable } from '@nestjs/common';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';

@Injectable()
export class TrainScheduleService {
  create(createTrainScheduleDto: CreateTrainScheduleDto) {
    return 'This action adds a new trainSchedule';
  }

  findAll() {
    return `This action returns all trainSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainSchedule`;
  }

  update(id: number, updateTrainScheduleDto: UpdateTrainScheduleDto) {
    return `This action updates a #${id} trainSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainSchedule`;
  }
}
