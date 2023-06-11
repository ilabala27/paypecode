import httpInterservice, { IEnv, IHttpApiCommunicationChannel } from 'inter-service-gateway';
import { HttpException, HttpStatus } from '@nestjs/common';

export default class InterService {

  static async httpCommunicationChannel({
    service, method, endpoint,
    headers = {}, query = {}, body = {},
  }: IHttpApiCommunicationChannel) {
    const env: IEnv = 'local'
    const apiResponse = await httpInterservice.apiCommunicationChannel(
      env, service, method, endpoint,
      headers, query, body,
    );
    if (apiResponse.data) {
      return apiResponse.data;
    }
    if (apiResponse.response && apiResponse.response.data) {
      return apiResponse.response.data;
    } else if (apiResponse.request) {
      throw new HttpException(
        `Inter service error: ${JSON.stringify(apiResponse.request)}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return apiResponse;
  }
  
}

