import {Category} from '../types';
import api from './api';

export default {
  getCategories: () =>
    api.any<Category[], unknown>({
      method: 'GET',
      url: '/categories',
    }),
};
