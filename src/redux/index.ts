import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  AuthSlice,
  CategoriesSlice,
  authActions,
  categoriesActions,
} from './reducer';
import {SliceName} from '../types';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {thunk} from 'redux-thunk';
import {useDispatch} from 'react-redux';

const reducers = combineReducers({
  [SliceName.auth]: AuthSlice.reducer,
  [SliceName.categories]: CategoriesSlice.reducer,
});

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

const actions = {
  ...authActions,
  ...categoriesActions,
};

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export {store, actions, storage};
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
