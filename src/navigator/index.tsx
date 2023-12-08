import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationStackParamList} from '../types';
import MainNavigator from './Main';
const Stack = createStackNavigator<ApplicationStackParamList>();

const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
