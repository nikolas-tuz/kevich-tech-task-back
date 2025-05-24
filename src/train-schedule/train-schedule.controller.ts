import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TrainScheduleService } from './train-schedule.service';
import { CreateTrainScheduleDto } from './dto/create-train-schedule.dto';
import { UpdateTrainScheduleDto } from './dto/update-train-schedule.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser, CurrentUserType } from '../auth/current-user.decorator';
import { FindAllQueryDto } from '../auth/dto/find-all-query.dto';

@Controller('train-schedule')
@UseGuards(AuthGuard)
export class TrainScheduleController {
  constructor(private readonly trainScheduleService: TrainScheduleService) {}

  @Post()
  create(
    @Body() createTrainScheduleDto: CreateTrainScheduleDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.trainScheduleService.create({
      ...createTrainScheduleDto,
      userId: user.id,
    });
  }

  @Get(``)
  findAll(
    @CurrentUser() user: CurrentUserType,
    @Query() findAllQueryDto: FindAllQueryDto,
  ) {
    return this.trainScheduleService.findAll(user.id, findAllQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserType) {
    return this.trainScheduleService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrainScheduleDto: UpdateTrainScheduleDto,
  ) {
    return this.trainScheduleService.update(+id, updateTrainScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainScheduleService.remove(+id);
  }
}
