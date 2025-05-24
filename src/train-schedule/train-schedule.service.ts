import { Injectable } from '@nestjs/common';
import { CreateTrainScheduleDtoForService } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { PrismaClient } from 'generated/prisma';
import { FindAllQueryDto } from '../auth/dto/find-all-query.dto';

@Injectable()
export class TrainScheduleService {
  private prisma = new PrismaClient();

  async create(createTrainScheduleDto: CreateTrainScheduleDtoForService) {
    const newTrainSchedule = await this.prisma.trainSchedule.create({
      data: {
        ...createTrainScheduleDto,
      },
    });

    return {
      status: `success`,
      data: { trainSchedule: newTrainSchedule },
    };
  }

  async findAll(userId: string, findAllQueryDto: FindAllQueryDto) {
    const { searchTerm, status, page, limit } = findAllQueryDto;

    const whereClause: {
      userId: string;
      status?: string;
      OR?: {
        departureStation?: { contains: string; mode?: 'insensitive' };
        arrivalStation?: { contains: string; mode?: 'insensitive' };
      }[];
    } = { userId };

    if (status) whereClause.status = status;

    if (searchTerm) {
      whereClause.OR = [
        { departureStation: { contains: searchTerm } },
        { arrivalStation: { contains: searchTerm } },
      ];
    }

    const trainSchedules =
      (await this.prisma.trainSchedule.findMany({
        where: whereClause,
        skip: (page - 1) * limit,
        take: limit,
      })) || [];

    const trainScheduleCount = await this.prisma.trainSchedule.count({
      where: whereClause,
    });

    return {
      status: `success`,
      data: { trainSchedules, total: trainScheduleCount },
    };
  }

  findOne(id: string, userId: string) {
    return `some string`;
  }

  update(id: number, updateTrainScheduleDto: UpdateTrainScheduleDto) {
    return `This action updates a #${id} trainSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainSchedule`;
  }
}
