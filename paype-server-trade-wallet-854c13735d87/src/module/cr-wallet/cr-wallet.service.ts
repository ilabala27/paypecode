import * as moment from "moment";
import { nanoid } from 'nanoid/async';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrWallet } from './entities/cr-wallet.entity';
import { CreateCrWalletDto, } from './dto/create-cr-wallet.dto';
import { BAD_REQUEST, NOT_FOUND } from 'src/common/methods/handler.methods';

@Injectable()
export class CrWalletService {
  constructor(
    @InjectRepository(CrWallet)
    private crWalletRepo: Repository<CrWallet>,
  ) { }

  public async create(createCrWalletDto: CreateCrWalletDto) {
    try {
      const uniqueId: string = await nanoid(24);
      const body: any = {
        crwa_user_id: createCrWalletDto.crwa_user_id,
        crwa_id: uniqueId,
        crwa_currency: 'INR'
      }
      const crWallet: CreateCrWalletDto = new CrWallet();
      await this.crWalletRepo.save({ ...crWallet, ...body });
      return {
        message: "Wallet created successfully"
      }
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async activateCrWalletByUserId(user_id) {
    try {
      const wallet = await this.findByFields({ crwa_user_id: user_id })
      if (wallet.length !== 1) NOT_FOUND();
      if (wallet[0].crwa_is_active) BAD_REQUEST({ message: "Already activated" })
      const payload = {
        crwa_is_active: true,
        crwa_is_actived_at: moment(),
        crwa_is_wallet_credit_enabled: true,
      }
      await this.crWalletRepo.update({ crwa_user_id: user_id }, payload);
      return {
        message: "Wallet activated successfully"
      }
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findOneById(crwa_id: string) {
    try {
      const wallets = await this.crWalletRepo.find({ where: { crwa_id, crwa_is_active: true } })
      if (wallets.length !== 1) NOT_FOUND();
      return wallets[0]
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async findOneByUserId(crwa_user_id: string) {
    try {
      const wallets = await this.crWalletRepo.find({ where: { crwa_user_id, crwa_is_active: true } })
      if (wallets.length !== 1) NOT_FOUND();
      return wallets[0]
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  private async findByFields(body: any) {
    try {
      const { orderBy = {}, ...restBody } = body
      return await this.crWalletRepo.find({ where: restBody, order: orderBy })
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async getWalletBalanceByUserId(crwa_user_id: string) {
    try {
      const wallets = await this.crWalletRepo.find({ where: { crwa_user_id, crwa_is_active: true } })
      if (wallets.length !== 1) NOT_FOUND();
      const {
        crwa_is_active,
        crwa_is_wallet_credit_enabled, crwa_is_blocked_credit_enabled,
        crwa_wallet_credit, crwa_blocked_credit, crwa_id
      } = wallets[0]

      const blocked_credit = crwa_is_blocked_credit_enabled && crwa_blocked_credit > 0 ? crwa_blocked_credit : 0.00000000
      const wallet_credit = crwa_is_wallet_credit_enabled && crwa_wallet_credit > 0 ? crwa_wallet_credit : 0.00000000
      const available_credit = (wallet_credit - blocked_credit).toFixed(8)

      return {
        crwa_id, crwa_user_id,
        is_blocked_credit_enabled: crwa_is_blocked_credit_enabled,
        blocked_credit: crwa_blocked_credit,
        is_wallet_credit_enabled: crwa_is_wallet_credit_enabled,
        wallet_credit: crwa_wallet_credit,
        is_available_credit_enabled: crwa_is_active,
        available_credit
      }
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

}
