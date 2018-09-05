import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {
  Button, Text, Icon, Footer, FooterTab,
} from 'native-base';
import { persistor, store } from './app/store';

import LoadingScreen from './app/screens/LoadingScreen/LoadingScreen';
import ActListScreen from './app/screens/ActListScreen/ActListScreen';
import GroupScreen from './app/screens/GroupScreen/GroupScreen';
import TransferScreen from './app/screens/TransferScreen/TransferScreen';

export const App = () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <ActListScreen />
    </PersistGate>
  </Provider>
);

export default App;

const AppScreen = TabNavigator(
  {
    Items: { screen: props => <ActListScreen {...props} /> },
    Groups: { screen: props => <GroupScreen {...props} /> },
    Transfers: { screen: props => <TransferScreen {...props} /> },
  },
  {
    tabBarPosition: 'bottom',
    tabBarComponent: props => (
      <Footer>
        <FooterTab style={{ backgroundColor: '#795548' }}>
          <Button
            vertical
            backgroundColor={props.navigationState.index === 1 ? '#a1887f' : '#795548'}
            active={props.navigationState.index === 0}
            onPress={() => props.navigation.navigate('Items')}
          >
            <Icon name="list" type="Entypo" />
            <Text>
              {'Items'}
            </Text>
          </Button>
          <Button
            vertical
            backgroundColor={props.navigationState.index === 1 ? '#a1887f' : '#795548'}
            active={props.navigationState.index === 1}
            onPress={() => props.navigation.navigate('Groups')}
          >
            <Icon name="group" type="FontAwesome" />
            <Text>
              {'Group'}
            </Text>
          </Button>
          <Button
            vertical
            backgroundColor={props.navigationState.index === 2 ? '#a1887f' : '#795548'}
            active={props.navigationState.index === 2}
            onPress={() => props.navigation.navigate('Transfers')}
          >
            <Icon name="headset" />
            <Text>
              {'Transfers'}
            </Text>
          </Button>
        </FooterTab>
      </Footer>
    ),
  },
);
