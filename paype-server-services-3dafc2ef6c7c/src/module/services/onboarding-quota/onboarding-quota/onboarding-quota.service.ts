import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOnboardingQuotaDto } from './dto/create-onboarding-quota.dto';
import { UpdateOnboardingParams, UpdateOnboardingQuotaDto } from './dto/update-onboarding-quota.dto';

import { nanoid } from 'nanoid/async';
import { queryMatch } from './onboarding-quota.query';
import { OnboardingQuota, OnboardingQuotaDocument } from './entities/onboarding-quota.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OnboardingQuotaService {
  constructor(
    @InjectModel(OnboardingQuota.name)
    private OnboardingQuotaRepo: Model<OnboardingQuotaDocument>,
  ) { }

  async create(createOnboardingQuotaDto: CreateOnboardingQuotaDto): Promise<OnboardingQuota | any> {
    try {
      const onBoardingQuota = await this.findAllByFields({ onqu_user_id: createOnboardingQuotaDto.onqu_user_id })

      if (onBoardingQuota.length > 0) {
        const existing = onBoardingQuota[0]
        const params: any = { onqu_id: existing.onqu_id, user_id: createOnboardingQuotaDto.created_by }
        const body = {
          onqu_available: parseInt(existing.onqu_available + '') + parseInt(createOnboardingQuotaDto.onqu_available + ''),
          onqu_total: parseInt(existing.onqu_total + '') + parseInt(createOnboardingQuotaDto.onqu_total + ''),
        }
        return await this.update(params, body)
      }

      createOnboardingQuotaDto.onqu_id = await nanoid(24)
      return await this.OnboardingQuotaRepo.create(createOnboardingQuotaDto)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<OnboardingQuota[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.OnboardingQuotaRepo.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(onqu_id: string): Promise<OnboardingQuota> {
    try {
      const result = await this.OnboardingQuotaRepo.aggregate([
        queryMatch([
          { "$eq": ["$onqu_id", onqu_id] }
        ])
      ])
      if (!result.length) throw new NotFoundException("No record found")
      return result[0]
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByFields(updateOnboardingQuotaDto: UpdateOnboardingQuotaDto): Promise<OnboardingQuota[]> {
    try {
      return await this.OnboardingQuotaRepo.find(updateOnboardingQuotaDto).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async useQuotaForOnboarding(updateOnboardingQuotaDto: UpdateOnboardingQuotaDto): Promise<OnboardingQuota | string> {
    try {
      const onBoardingQuota = await this.findAllByFields({ onqu_user_id: updateOnboardingQuotaDto?.onqu_user_id, is_active: true })
      if (onBoardingQuota.length != 1)
        throw new BadRequestException("Something went wrong")
      const data = onBoardingQuota[0]
      const onqu_available = parseInt(data.onqu_available + '') - 1
      if (onqu_available < 0)
        throw new BadRequestException("No quota exist")

      const params: any = { onqu_id: data.onqu_id, user_id: data.created_by }
      const body = {
        onqu_available: parseInt(data.onqu_available + '') - 1
      }
      return await this.update(params, body, 'string')
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(params: UpdateOnboardingParams, updateOnboardingQuotaDto: UpdateOnboardingQuotaDto, returnType?: string): Promise<OnboardingQuota | string> {
    try {
      const { onqu_id, user_id } = params
      const record = await this.findOneById(onqu_id)
      const body = {
        onqu_id,
        ...updateOnboardingQuotaDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.OnboardingQuotaRepo.updateOne({ onqu_id }, body).exec();
      return returnType == 'string' ? 'success' : await this.findOneById(onqu_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
