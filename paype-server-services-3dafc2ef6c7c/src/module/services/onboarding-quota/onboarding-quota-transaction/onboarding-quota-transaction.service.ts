import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid/async';
import { OnboardingQuotaService } from '../onboarding-quota/onboarding-quota.service';
import { CreateOnboardingQuotaTransactionDto } from './dto/create-onboarding-quota-transaction.dto';
import { UpdateOnboardingQuotaTransactionDto, updateOnboardingQuotaTransactionParams } from './dto/update-onboarding-quota-transaction.dto';
import { OnboardingQuotaTransaction, OnboardingQuotaTransactionDocument, OnboardingQuotaTransactionSchema } from './entities/onboarding-quota-transaction.entity';
import { queryMatch } from './onboarding-quota-transaction.query';
import { ConfigService } from '@nestjs/config';
import { CipherService } from 'src/common/cipher/cipher.service';
import InterService from 'src/common/inter-service';


@Injectable()
export class OnboardingQuotaTransactionService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @InjectModel(OnboardingQuotaTransaction.name)
    private OnboardingQuotaTransactionRepo: Model<OnboardingQuotaTransactionDocument>,
    private readonly onboardingQuotaService: OnboardingQuotaService,
    private readonly cipherService: CipherService
  ) { }

  async create(header: any, createOnboardingQuotaDto: CreateOnboardingQuotaTransactionDto): Promise<OnboardingQuotaTransaction | any> {
    try {
      createOnboardingQuotaDto.oqtr_id = await nanoid(24)
      const body = {
        "cwtr_transacted_user_id": createOnboardingQuotaDto.oqtr_transact_user_id,
        "cwtr_session_id": header.session_id,
        "cwtr_user_id": createOnboardingQuotaDto.oqtr_user_id,
        "cwtr_transaction_id": createOnboardingQuotaDto.oqtr_id,
        "cwtr_status": "DT_SUCCESS_ONBOARDING",
        "cwtr_short_description": createOnboardingQuotaDto.oqtr_short_description,
        "cwtr_description": createOnboardingQuotaDto.oqtr_description,
        "cwtr_transaction_amount": parseFloat(createOnboardingQuotaDto.oqtr_net_payable + '').toFixed(8),
        "cwtr_remark": "",
        "cwtr_note": ""
      }

      const cipher = this.cipherService.encryptWithFormat(body)
      const debit = await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'cr-wallet',
          method: 'post',
          endpoint: `/cr-wallet/user/${createOnboardingQuotaDto.oqtr_user_id}/transaction/debit`,
          headers: { "authorization": header.authorization },
          query: {},
          body: cipher
        })
      ])

      const debitMessage = debit[0]?.message ?? ''
      if (debitMessage == "Transaction successful") {
        await this.OnboardingQuotaTransactionRepo.create(createOnboardingQuotaDto)
        const newBody: any = {
          "onqu_id": "__NEW__",
          "onqu_user_id": createOnboardingQuotaDto.oqtr_user_id,
          "created_by": createOnboardingQuotaDto.oqtr_transact_user_id,
          "onqu_available": createOnboardingQuotaDto.oqtr_qty,
          "onqu_total": createOnboardingQuotaDto.oqtr_qty,
        }
        return await this.onboardingQuotaService.create(newBody);
      }

    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAll(): Promise<OnboardingQuotaTransaction[]> {
    try {
      const body = {
        is_deleted: false
      }
      return await this.OnboardingQuotaTransactionRepo.find(body).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findOneById(oqtr_id: string): Promise<OnboardingQuotaTransaction> {
    try {
      const result = await this.OnboardingQuotaTransactionRepo.aggregate([
        queryMatch([
          { "$eq": ["$oqtr_id", oqtr_id] }
        ])
      ])
      if (!result.length) throw new NotFoundException("No record found")
      return result[0]
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async findAllByFields(updateOnboardingQuotaTransactionDto: UpdateOnboardingQuotaTransactionDto): Promise<OnboardingQuotaTransaction[]> {
    try {
      return await this.OnboardingQuotaTransactionRepo.find(updateOnboardingQuotaTransactionDto).exec();
    } catch (err) {
      throw new BadRequestException(err)
    }
  }

  async update(
    params: updateOnboardingQuotaTransactionParams,
    updateOnboardingQuotaTransactionDto: UpdateOnboardingQuotaTransactionDto,
    returnType?: string
  ): Promise<OnboardingQuotaTransaction | string> {
    try {
      const { oqtr_id, user_id } = params
      const record = await this.findOneById(oqtr_id)
      const body = {
        oqtr_id,
        ...updateOnboardingQuotaTransactionDto,
        schema_version: record.schema_version + 1,
        updated: [
          ...record.updated,
          { _by: user_id }
        ]
      }
      await this.OnboardingQuotaTransactionRepo.updateOne({ oqtr_id }, body).exec();
      return returnType == 'string' ? 'Successfully deleted' : await this.findOneById(oqtr_id)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}
