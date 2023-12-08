import {Category} from '../response';

export enum SliceName {
  auth = 'auth',
  categories = 'categories',
}

export type GlobalState = {
  [SliceName.auth]: AuthState;
  [SliceName.categories]: CategoriesState;
};

export type AuthState = {
  isLogin: boolean;
  loading: boolean;
};

export type CategoriesState = {
  categories: Category[];
  loading: boolean;
};
