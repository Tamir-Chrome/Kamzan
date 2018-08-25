import React, { Component } from 'react';
import {
  FlatList, View, AsyncStorage, ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import InsertActRow from '../../components/InsertRow/InsertActRow';
import ActFlatListItem from '../../components/FlatListItem/ActFlatListItem';
import { jsonToMap, mapToJson, mapKeys } from '../../util';
import EditValuePrompt from '../../components/Modals/EditValue';

const img = require('../../images/wooden-board.jpg');

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
    this.personList = new Map([]);
    this.sharedItems = {};
    // AsyncStorage.clear();
  }

  componentDidMount = () => AsyncStorage.multiGet(['actList', 'personList', 'sharedItems'])
    .then((value) => {
      this.setState({
        actList: value[0][1] != null ? jsonToMap(value[0][1]) : new Map([]),
      });
      this.personList = value[1][1] != null ? jsonToMap(value[1][1]) : new Map([]);
      this.sharedItems = value[2][1] != null ? JSON.parse(value[2][1]) : {};
    })
    .catch(e => console.error('ActListScreen.js:componentDidMount:', e.message));

  /*
  componentDidUpdate = () => AsyncStorage.multiGet(['actList', 'personList', 'sharedItems'])
    .then((value) => {
      this.setState({
        actList: value[0][1] != null ? jsonToMap(value[0][1]) : new Map([]),
      });
      this.personList = value[1][1] != null ? jsonToMap(value[1][1]) : new Map([]);
      this.sharedItems = value[2][1] != null ? JSON.parse(value[2][1]) : {};
    })
    .catch(e => console.error('ActListScreen.js:componentDidUpdate:', e.message));
  */

  updateActList(newList) {
    this.setState({ actList: newList });
    AsyncStorage.setItem('actList', mapToJson(newList)).catch(e => console.error('ActListScreen.js:updateActList:', e.message));
  }

  // TODO: implement deep delete
  deleteFromList(actName) {
    const { actList } = this.state;
    // remove act from every person
    this.personList.forEach((person) => {
      const indexOfAct = person.acts.indexOf(actName);
      if (indexOfAct !== -1) person.acts.splice(indexOfAct, 1);
    });

    // remove act from sharedItems
    if (actList.get(actName).isShared) delete this.sharedItems[actName];

    // remove from actList
    actList.delete(actName);

    // update data
    this.setState({ actList });
    AsyncStorage.multiSet([
      ['actList', mapToJson(actList)],
      ['personList', mapToJson(this.personList)],
      ['sharedItems', JSON.stringify(this.sharedItems)],
    ]).catch(e => console.error('ActListScreen.js:deleteFromList:', e.message));
  }

  // only called if act name is change
  deepReplaceAct(prevAct, newAct, newPrice) {
    const { actList } = this.state;
    // replace act from every person
    this.personList.forEach((person) => {
      const indexOfAct = person.acts.indexOf(prevAct);
      if (indexOfAct !== -1) {
        person.acts[indexOfAct] = newAct;
      }
    });

    // get item from list
    const item = actList.get(prevAct);

    // replace act from sharedItems
    if (item.isShared) {
      this.sharedItems[newAct] = this.sharedItems[prevAct];
      delete this.sharedItems[prevAct];
    }
    if (newPrice) {
      if (item.isShared) {
        this.sharedItems[newAct].price = newPrice;
        item.price = Math.floor(newPrice / this.sharedItems[newAct].userCount);
      } else {
        item.price = newPrice;
      }
    }

    // remove from actList
    actList.set(newAct, item);
    actList.delete(prevAct);

    // update data
    this.setState({ actList });
    AsyncStorage.multiSet([
      ['actList', mapToJson(actList)],
      ['personList', mapToJson(this.personList)],
      ['sharedItems', JSON.stringify(this.sharedItems)],
    ]).catch(e => console.error('err', e.message));
  }

  addToList(price, name) {
    const { actList } = this.state;
    if (price && name && !actList.has(name)) {
      actList.set(name, { price, isShared: false });
      this.updateActList(actList);
    }
  }

  changeSharedItem(name) {
    // check if item is used TODO: ADD ALERT
    if (!(name in this.sharedItems)) {
      const { actList } = this.state;
      const item = actList.get(name);
      item.isShared = !item.isShared;
      this.updateActList(actList);
    }
  }

  hardReset() {
    AsyncStorage.clear();
    this.setState({ actList: new Map([]) });
  }

  showPrompt(actName) {
    this.prompt.setModalVisible(true, actName);
  }

  submitInput(price, newName, name) {
    const { actList } = this.state;
    if (newName && !actList.has(newName) && name && actList.has(name)) {
      this.deepReplaceAct(name, newName, price);
    } else if (price && name) {
      const item = actList.get(name);
      // replace act from sharedItems
      if (item.isShared) {
        this.sharedItems[name].price = price;
        item.price = Math.floor(price / this.sharedItems[name].userCount);
      } else {
        item.price = price;
      }
      this.setState({ actList });
      AsyncStorage.multiSet([
        ['actList', mapToJson(actList)],
        ['sharedItems', JSON.stringify(this.sharedItems)],
      ]).catch(e => console.error('err', e.message));
    }
  }

  render() {
    const { actList } = this.state;
    return (
      <ImageBackground source={img} style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
        <EditValuePrompt
          onRef={(ref) => {
            this.prompt = ref;
          }}
          title="Edit act"
          message="edit price and name of act"
          parentScreen={this}
        />
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
            marginTop: 7,
          }}
        >
          <View style={{}}>
            <Icon
              active
              style={{ color: '#C11B0F' }}
              name="delete-forever"
              type="MaterialIcons"
              onPress={() => this.hardReset()}
            />
          </View>
          <View style={{ flex: 1 }}>
            <InsertActRow parentFlatList={this} />
          </View>
        </View>
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
      </ImageBackground>
    );
  }
}
