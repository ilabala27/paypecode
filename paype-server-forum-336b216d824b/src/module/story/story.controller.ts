import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('story')
@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) { }

  @Post()
  async create(@Body() createStoryDto: CreateStoryDto) {
    return await this.storyService.create(createStoryDto);
  }

  @Get('or')
  async findAllByORQuery(@Query() query: UpdateStoryDto) {
    return await this.storyService.findAllByORQuery(query);
  }

  @Get('and')
  async findAllByANDQuery(@Query() query: UpdateStoryDto) {
    return await this.storyService.findAllByANDQuery(query);
  }

  @Patch(':stor_id')
  async updateOne(@Param('stor_id') stor_id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return await this.storyService.updateOne(stor_id, updateStoryDto);
  }

  @Delete(':stor_id')
  async removeOne(@Param('stor_id') stor_id: string) {
    return await this.storyService.updateOne(stor_id, {
      is_deleted: true, is_active: false
    });
  }
}
