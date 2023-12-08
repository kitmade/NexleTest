import apisauce from 'apisauce';
import {storage} from '../redux';

const api = apisauce.create({
  baseURL: 'http://streaming.nexlesoft.com:3001/',
});

api.addAsyncRequestTransform(async request => {
  try {
    const token = await storage.load({key: 'token', autoSync: true});
    if (token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  } catch (e) {}
});

export default api;
