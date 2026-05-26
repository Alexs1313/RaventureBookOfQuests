import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox} from 'react-native';

if (!__DEV__) {
  LogBox.ignoreAllLogs();
}

import ExplorerMytthofRootNavigator from './ExplorerMytthofSrc/ExplorerMytthofNavigation/ExplorerMytthofRootNavigator';

const App = () => (
  <NavigationContainer>
    <ExplorerMytthofRootNavigator />
  </NavigationContainer>
);

export default App;
