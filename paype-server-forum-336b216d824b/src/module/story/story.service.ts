import { Injectable, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid/async';
import { matchANDPipeline, matchORPipeline } from './story.query';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story, StoryDocument } from './entities/story.entity';
import { BAD_REQUEST, NOFOUND_REQUEST } from 'src/common/methods/handler.methods';

@Injectable()
export class StoryService {
  constructor(
    @InjectModel(Story.name)
    private storyModel: Model<StoryDocument>,
  ) { }

  async create(createStoryDto: CreateStoryDto): Promise<Story> {
    try {
      createStoryDto.stor_id = await nanoid(24)
      createStoryDto.created_by = createStoryDto.user.preferred_username
      return await this.storyModel.create(createStoryDto)
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByORQuery(query: UpdateStoryDto): Promise<Story[]> {
    try {
      const keys = Object.keys(query)
      const pipeline: any = matchORPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] }))
      )

      const result = await this.storyModel.aggregate([...pipeline])
      // if (!result.length) NOFOUND_REQUEST("No story found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async findAllByANDQuery(query: UpdateStoryDto): Promise<Story[]> {
    try {
      const keys = Object.keys(query)
      const pipeline: any = matchANDPipeline(
        keys.map((e) => ({ "$eq": [`$${e}`, query[e]] }))
      )

      const result = await this.storyModel.aggregate(pipeline)
      // if (!result.length) NOFOUND_REQUEST("No story found")
      return result
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }

  async updateOne(stor_id: string, updateStoryDto: UpdateStoryDto): Promise<Story[]> {
    try {
      // # Get
      const res = await this.findAllByANDQuery({ stor_id })
      if (res.length != 1) BAD_REQUEST("No story exist")
      const [story] = res

      // # Update
      const body = {
        stor_id,
        ...story,
        ...updateStoryDto,
        schema_version: story.schema_version + 1,
        updated: [
          ...story.updated,
          { _by: updateStoryDto.user.preferred_username }
        ]
      }
      await this.storyModel.updateOne({ stor_id }, body).exec();

      // # Get updated
      return await this.findAllByANDQuery({ stor_id })
    } catch (err) {
      BAD_REQUEST(err.message)
    }
  }
}
