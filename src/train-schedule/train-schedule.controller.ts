import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainScheduleService } from './train-schedule.service';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';

@Controller('train-schedule')
export class TrainScheduleController {
  constructor(private readonly trainScheduleService: TrainScheduleService) {}

  @Post()
  create(@Body() createTrainScheduleDto: CreateTrainScheduleDto) {
    return this.trainScheduleService.create(createTrainScheduleDto);
  }

  @Get()
  findAll() {
    return this.trainScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainScheduleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainScheduleDto: UpdateTrainScheduleDto) {
    return this.trainScheduleService.update(+id, updateTrainScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainScheduleService.remove(+id);
  }
}
