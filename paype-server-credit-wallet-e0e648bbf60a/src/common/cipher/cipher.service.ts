import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import * as CryptoJS from 'crypto-js'
import * as moment from 'moment';
import { BAD_REQUEST } from '../methods/handler.methods';


@Injectable()
export class CipherService {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) { }

  private CR_KEY: string = this.config.get<string>('CR_KEY')

  public encrypt(data) {
    try {
      // ### Format and Encrypt
      const dataAsString = JSON.stringify(data)
      const cipherText = CryptoJS.AES.encrypt(dataAsString, this.CR_KEY).toString();
      return cipherText
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public decrypt(cipherAsText) {
    try {
      // ### Decrypt and Format
      const bytes = CryptoJS.AES.decrypt(cipherAsText, this.CR_KEY);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      return data
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public encryptWithFormat(rawData) {
    const timeNow = moment()
    const rawTime = timeNow.toISOString()
    const data = {
      time: timeNow.add(360, 'seconds').toISOString(),
      ...rawData
    }
    const cipher = this.encrypt(data)
    return {
      cipherTime: rawTime,
      cipher
    }
  }

  public decryptFormattedCipher(formattedCipherData) {
    try {
      const { cipherTime, cipher } = formattedCipherData
      const { time, ...rest } = this.decrypt(cipher)
      if (
        moment(time).diff(moment(cipherTime)) !== 360000 || // 6mins
        moment().diff(moment(cipherTime)) > 30000 // 30secs
      ) {
        return { granted: false }
      }
      return { granted: true, time, ...rest }
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

  public async validateData(Schema, dataFromCipher) {
    try {
      const myDtoObject = plainToInstance(Schema, dataFromCipher)
      const error = await validate(myDtoObject)
      return error
    } catch (err) {
      BAD_REQUEST(err)
    }
  }

}
