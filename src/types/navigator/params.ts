import {Category} from '../response';
import {Screens} from './screens';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainParamList = {
  [Screens.SignUp]: undefined;
  [Screens.Categories]: {selecteds: Category[]};
};

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamList>;
};
