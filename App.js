import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ActListScreen from './app/screens/ActListScreen/ActListScreen';
import GroupScreen from './app/screens/GroupScreen/GroupScreen';
import TransferScreen from './app/screens/TransferScreen/TransferScreen';

const RootStack = createStackNavigator(
  {
    Items: ActListScreen,
    Groups: GroupScreen,
    Transfers: TransferScreen,
  },
  {
    initialRouteName: 'Items',
  },
);

const App = () => <RootStack />;
export default App;
