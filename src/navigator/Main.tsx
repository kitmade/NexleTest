import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '../types';
import {CategoriesScreen, SignUpScreen} from '../screens';
import {HeaderBackButton} from '../components';
import CategoriesDoneButton from '../components/CategoriesDoneButton';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerTransparent: true,
        headerBackAccessibilityLabel: 'testing',
        headerLeft: HeaderBackButton,
      }}
      initialRouteName={Screens.SignUp}>
      <Stack.Screen name={Screens.SignUp} component={SignUpScreen} />
      <Stack.Screen
        options={{
          headerRight: CategoriesDoneButton,
        }}
        name={Screens.Categories}
        component={CategoriesScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
