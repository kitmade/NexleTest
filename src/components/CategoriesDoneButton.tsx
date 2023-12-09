import {RouteProp, useRoute} from '@react-navigation/native';
import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {MainParamList, Screens} from '../types';
import {useTheme} from '../hooks';
import Text from './Text';

interface CategoriesDoneButtonProps {}

const CategoriesDoneButton = ({...props}: CategoriesDoneButtonProps) => {
  const route = useRoute<RouteProp<MainParamList, Screens.Categories>>();

  const {Gutters} = useTheme();

  const onDonePress = () => {
    console.log('submit selecteds: ', route.params?.selecteds || []);
  };

  return (
    <TouchableOpacity
      onPress={onDonePress}
      style={Gutters.mediumRPadding}
      {...props}>
      <Text>Done</Text>
    </TouchableOpacity>
  );
};

export default CategoriesDoneButton;
