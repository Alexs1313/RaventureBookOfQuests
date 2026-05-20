import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import RaventreBookquesttstab from './RaventreBookquesttstab';
import RaventreBookquesttson from '../RaventreBookquesttscrns/RaventreBookquesttson';
import RaventreBookquesload from '../RaventreBookquesttscpnt/RaventreBookquesload';

export type RootStackParamList = {
  Loading: undefined;
  Onboarding: undefined;
  MainTabs: undefined;
  LocationDetail: {locationId: string};
};

const Stack = createStackNavigator();

const RaventreBookquesstack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="RaventreBookquesload"
        component={RaventreBookquesload}
      />
      <Stack.Screen
        name="RaventreBookquesttson"
        component={RaventreBookquesttson}
      />
      <Stack.Screen
        name="RaventreBookquesttstab"
        component={RaventreBookquesttstab}
      />
    </Stack.Navigator>
  );
};

export default RaventreBookquesstack;
