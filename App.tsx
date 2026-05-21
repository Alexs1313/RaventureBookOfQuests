import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import RootNavigator from './src/app/navigation/RootNavigator';

const App = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);

export default App;
