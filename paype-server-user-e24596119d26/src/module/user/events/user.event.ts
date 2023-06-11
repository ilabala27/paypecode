import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OnEvent } from "@nestjs/event-emitter";
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { AwsAuthService } from 'src/module/aws-auth/aws-auth.service';
import InterService from 'src/common/inter-service';


@Injectable()
export class UserServiceEvent {
  constructor(
    public readonly config: ConfigService,
    public readonly awsAuthService: AwsAuthService,
  ) { }

  @OnEvent('user.created-by-admin')
  async userCreatedByAdmin(user: User, headers): Promise<boolean> {
    try {
      await this.updateUserIdToAws(`${user.user_mobile_ex}${user.user_mobile_no}`, user.user_id)
      await this.createCreditWallet(headers, user)
      await this.createTradeWallet(headers, user)
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @OnEvent('user.activate-wallet')
  async activateWallet(data, headers): Promise<boolean> {
    try {
      await this.activateCreditWallet({ authorization: headers.authorization }, data)
      await this.activateTradeWallet({ authorization: headers.authorization }, data)
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ### AWS 
  private async updateUserIdToAws(username: string, userId: string): Promise<boolean> {
    try {
      await this.awsAuthService.updateUserAttributesByAdmin(username, [{ Name: 'preferred_username', Value: userId }])
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ### Credit wallet
  private async createCreditWallet(headers, data): Promise<boolean> {
    try {
      const body = { "crwa_user_id": data.user_id }
      await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'cr-wallet',
          method: 'post',
          endpoint: `/cr-wallet`,
          headers: { "authorization": headers.authorization },
          query: {},
          body
        })
      ])
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async activateCreditWallet(headers, data): Promise<boolean> {
    try {
      await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'cr-wallet',
          method: 'patch',
          endpoint: `/cr-wallet/activate/${data.user_id}`,
          headers: { "authorization": headers.authorization },
          query: {},
        })
      ])
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  // ### Trade wallet
  private async createTradeWallet(headers, data): Promise<boolean> {
    try {
      const body = { "crwa_user_id": data.user_id }
      await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'trade-wallet',
          method: 'post',
          endpoint: `/trade-wallet`,
          headers: { "authorization": headers.authorization },
          query: {},
          body
        })
      ])
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async activateTradeWallet(headers, data): Promise<boolean> {
    try {
      await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'trade-wallet',
          method: 'patch',
          endpoint: `/trade-wallet/activate/${data.user_id}`,
          headers: { "authorization": headers.authorization },
          query: {},
        })
      ])
      return true
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

}