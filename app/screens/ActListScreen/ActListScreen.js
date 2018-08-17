import React, { Component } from 'react';
import {
  FlatList, View, AsyncStorage, Text,
} from 'react-native';
import { Container, Icon, Button } from 'native-base';
import InsertActRow from '../../components/InsertRow/InsertActRow';
import ActFlatListItem from '../../components/FlatListItem/ActFlatListItem';
import { jsonToMap, mapToJson, mapKeys } from '../../util';

/**
 *
 *
 * @export
 * @class ActListScreen
 * @extends {Component}
 *
 * @field
 * actList is a map that stores the keys as the name of the act and value as the properties of it
 */
export default class ActListScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      actList: new Map([]),
    };
    // AsyncStorage.clear();
  }

  componentDidMount = () => AsyncStorage.getItem('actList')
    .then((value) => {
      if (value) this.setState({ actList: jsonToMap(value) });
    })
    .catch(e => console.error('err', e.message));

  updateActList(newList) {
    this.setState({ actList: newList });
    AsyncStorage.setItem('actList', mapToJson(newList)).catch(e => console.error('err', e.message));
  }

  // TODO: implement deep delete
  deleteFromList(name) {
    const { actList } = this.state;
    actList.delete(name);
    this.updateActList(actList);
  }

  addToList(price, name) {
    const { actList } = this.state;
    if (price && name && !actList.has(name)) {
      actList.set(name, { price, isShared: false });
      this.updateActList(actList);
    }
  }

  changeSharedItem(name) {
    const { actList } = this.state;
    const item = actList.get(name);
    item.isShared = !item.isShared;
    this.updateActList(actList);
  }

  hardReset() {
    AsyncStorage.clear();
    this.setState({ actList: new Map([]) });
  }

  render() {
    const { actList } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
        <InsertActRow parentFlatList={this} />
        <FlatList
          style={{ flex: 0.8 }}
          data={mapKeys(actList).reverse()}
          renderItem={({ item }) => (
            <ActFlatListItem
              name={item}
              item={actList.get(item)}
              parentFlatList={this}
              bgColor={actList.get(item).isShared ? '#eeffff' : '#bbdefb'}
            />
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
          extraData={actList}
        />

        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Button danger onPress={() => this.hardReset()}>
            <Text style={{ color: 'white' }}>
              {'HARD RESET'}
            </Text>
          </Button>
          <Icon
            active
            style={{ color: '#e01d50' }}
            name="navigate-next"
            type="MaterialIcons"
            onPress={() => navigation.navigate('Groups')}
          />
        </View>
      </Container>
    );
  }
}
