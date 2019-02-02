/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

try {
    I18nManager.allowRTL(false);
  } catch (e) {
    console.log(e);
  }

AppRegistry.registerComponent(appName, () => App);
