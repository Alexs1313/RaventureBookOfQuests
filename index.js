/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const registerApp = () => App;

AppRegistry.registerComponent(appName, registerApp);
// Legacy native builds on device/simulator may still request the old module name.
AppRegistry.registerComponent('BookofExplorerMyths', registerApp);
