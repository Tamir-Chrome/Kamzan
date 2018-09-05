import { AppRegistry, I18nManager } from 'react-native';
import App from './App';

try {
  I18nManager.allowRTL(false);
} catch (e) {
  console.log(e);
}

AppRegistry.registerComponent('Kamzan', () => App);
