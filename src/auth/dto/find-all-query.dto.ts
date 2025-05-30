import { IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AvailableStatusesEnum } from '../../train-schedule/enums/available-statuses.enum';

export class FindAllQueryDto {
  @Type(() => Number)
  @Min(1)
  page: number;

  @Type(() => Number)
  @Min(0)
  limit: number;

  @IsOptional()
  @IsString()
  searchTerm: string;

  @IsOptional()
  @IsEnum(AvailableStatusesEnum)
  status: string;

  @IsOptional()
  @IsEnum([`desc`, `asc`])
  order: string;

  @IsOptional()
  @IsEnum([`trainNumber`, `createdAt`])
  sortBy: string;
}
