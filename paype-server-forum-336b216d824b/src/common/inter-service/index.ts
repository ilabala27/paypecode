import httpInterservice, { IEnv, IHttpApiCommunicationChannel } from 'inter-service-gateway';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export default class InterService {

  static async httpCommunicationChannel({
    service, method, endpoint,
    headers = {}, query = {}, body = {}, options = {}
  }: IHttpApiCommunicationChannel) {
    const env: IEnv = 'local'
    const apiResponse = await httpInterservice.apiCommunicationChannel(
      env, service, method, endpoint,
      headers, query, body, options
    );
    if (apiResponse.data) {
      return apiResponse.data;
    }
    if (apiResponse.response && apiResponse.response.data) {
      return apiResponse.response.data;
    } else if (apiResponse.request) {
      throw new HttpException(
        { message: `Inter service error: ${JSON.stringify(apiResponse.request)}` },
        HttpStatus.BAD_REQUEST,
      );
    }
    return apiResponse;
  }

  static async triggerUserNotification({ header, userId, title, body }) {
    try {
      const payload = { userId, deviceTokens: [], title, body }
      await Promise.all([
        await InterService.httpCommunicationChannel({
          service: 'user',
          method: 'post',
          endpoint: `/fcm/broadcastify-user`,
          headers: { "authorization": header.authorization },
          query: {},
          body: payload
        })
      ])
      return true
    } catch (err) {
      Logger.log({ message: `Inter service error: ${JSON.stringify(err)}` });
    }
  }

}

