import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Bookqqesttab from './Bookqqesttab';
import Bookqqeston from '../Bookqqestcrns/Bookqqeston';
import Bookqqestload from '../Bookqqestcpnt/Bookqqestload';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  LocationDetail: {locationId: string};
};

const Stack = createStackNavigator();

const Bookqqeststack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Bookqqestload"
        component={Bookqqestload}
      />
      <Stack.Screen
        name="Bookqqeston"
        component={Bookqqeston}
      />
      <Stack.Screen
        name="Bookqqesttab"
        component={Bookqqesttab}
      />
    </Stack.Navigator>
  );
};

export default Bookqqeststack;
