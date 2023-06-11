import httpInterservice, { IEnv, IHttpApiCommunicationChannel } from 'inter-service-gateway';
import { BAD_REQUEST } from '../methods/handler.methods';

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
      BAD_REQUEST({ message: `Notifivation service error` })
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
      BAD_REQUEST({ message: `Notifivation service error` })
    }
  }

}

