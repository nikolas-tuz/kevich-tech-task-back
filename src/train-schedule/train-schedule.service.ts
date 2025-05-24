import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainScheduleDtoForService } from './dto/create-train-schedule.dto';
import {
  UpdateTrainScheduleDto,
  UpdateTrainScheduleDtoPartial,
} from './dto/update-train-schedule.dto';
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
        // This is done to exclude userId & createdAt prop.
        // Unfortunately, there is no
        // way I can just exclude it without specifying all objects I do want to include. BUT PRISMA IS STILL SO COOL! (C) Nikolas Tuz 😎
        select: {
          id: true,
          trainNumber: true,
          departureStation: true,
          arrivalStation: true,
          departureTime: true,
          arrivalTime: true,
          status: true,
        },
      })) || [];

    const trainScheduleCount = await this.prisma.trainSchedule.count({
      where: whereClause,
    });

    return {
      status: `success`,
      data: { trainSchedules, total: trainScheduleCount },
    };
  }

  async findOne(id: string, userId: string) {
    const trainSchedule = await this.prisma.trainSchedule.findFirst({
      where: { userId, id },
    });

    if (!trainSchedule)
      throw new NotFoundException(
        `The train schedule with id ${id} was not found.`,
      );

    return {
      status: `success`,
      data: { trainSchedule },
    };
  }

  async update(
    id: string,
    updateTrainScheduleDto:
      | UpdateTrainScheduleDto
      | UpdateTrainScheduleDtoPartial,
    userId: string,
  ) {
    // if the schedule was not found, the error is guaranteed to be thrown because of "findOne" 😎.
    await this.findOne(id, userId);

    const updatedTrainSchedule = await this.prisma.trainSchedule.update({
      where: { id, userId },
      data: { ...updateTrainScheduleDto },
    });

    return {
      status: `success`,
      data: { trainSchedule: updatedTrainSchedule },
      message: `The train schedule was successfully updated.`,
    };
  }

  async remove(id: string, userId: string) {
    // ROUND 2: if the schedule was not found, the error is guaranteed to be thrown because of "findOne" 😎.
    await this.findOne(id, userId);

    const deletedTrainSchedule = await this.prisma.trainSchedule.delete({
      where: { id, userId },
    });

    return {
      status: `success`,
      data: { trainSchedule: deletedTrainSchedule },
      message: `The train schedule was successfully deleted!`,
    };
  }
}
