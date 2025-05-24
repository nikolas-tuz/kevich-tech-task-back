import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainScheduleDto } from './create-train-schedule.dto';

export class UpdateTrainScheduleDtoPartial extends PartialType(
  CreateTrainScheduleDto,
) {}

export class UpdateTrainScheduleDto extends CreateTrainScheduleDto {}
