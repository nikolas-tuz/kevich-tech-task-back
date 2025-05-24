import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { AvailableStatusesEnum } from '../enums/available-statuses.enum';

export class CreateTrainScheduleDto {
  @IsNumber()
  @IsPositive()
  trainNumber: number;

  @IsString()
  @Length(1, 999)
  departureStation: string;

  @IsString()
  @Length(1, 999)
  arrivalStation: string;

  @IsDateString()
  departureTime: string;
  @IsDateString()
  arrivalTime: string;

  @IsEnum(AvailableStatusesEnum)
  status: string;
}

export class CreateTrainScheduleDtoForService extends CreateTrainScheduleDto {
  @IsUUID()
  userId: string;
}
