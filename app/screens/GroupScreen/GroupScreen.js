import React, { Component } from 'react';
import {
  FlatList, View, AsyncStorage, ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonFlatListItem from '../../components/FlatListItem/PersonFlatListItem';
import ActBox from '../../components/ActBox/ActBox';
import InsertPersonRow from '../../components/InsertRow/InserPersonRow';
import { jsonToMap, mapToJson, mapKeys } from '../../util';
import * as Actions from '../../actions';

const img = require('../../images/wooden-board.jpg');

class GroupScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
    tabBarIcon: <Icon name="group" type="MaterialIcons" style={{ color: 'white' }} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      actList: new Map([]),
      personList: new Map([]),
    };
    this.selectedActName = '';
    this.sharedItems = {};
    // AsyncStorage.clear();
  }

  // only for actList and personList
  updateMap = (newList, listName) => {
    this.setState({ [listName]: newList });
    AsyncStorage.setItem(listName, mapToJson(newList)).catch(e => console.log('err', e.message));
  };

  addAct = (name) => {
    if (this.selectedActName && name) {
      const { personList, actList } = this.state;

      // add act name to person
      personList.get(name).acts.push(this.selectedActName);

      // get data about select act
      const item = actList.get(this.selectedActName);
      const tempActName = this.selectedActName;
      // add to shared item list
      if (item.isShared) {
        if (tempActName in this.sharedItems && this.sharedItems[tempActName].userCount >= 1) {
          this.sharedItems[tempActName].userCount += 1;
          item.price = Math.floor(
            this.sharedItems[tempActName].price / this.sharedItems[tempActName].userCount,
          );
          // update actList
          this.updateMap(actList, 'actList');
        } else this.sharedItems[tempActName] = { price: item.price, userCount: 1 };

        // update sharedItems
        console.log(this.sharedItems);
        AsyncStorage.setItem('sharedItems', JSON.stringify(this.sharedItems)).catch(e => console.log('err', e.message));
      }

      this.selectedActName = '';
      this.updateMap(personList, 'personList');
    }
  };

  removeAct = (name, actName) => {
    const { personList, actList } = this.state;

    // remove act from person
    const personActs = personList.get(name).acts;
    const indexOfAct = personActs.indexOf(actName);
    personActs.splice(indexOfAct, 1);

    // remove from shared item list
    if (actList.get(actName).isShared) {
      this.removeUser(actName);
    }

    this.updateMap(personList, 'personList');
  };

  deleteRowFromList = (name) => {
    const { personList, actList } = this.state;
    personList.get(name).acts.forEach((element) => {
      const item = actList.get(element);
      if (item.isShared) {
        this.removeUser(element);
      }
    });
    personList.delete(name);
    this.updateMap(personList, 'personList');
  };

  removeUser(actName) {
    const { actList } = this.state;
    const item = actList.get(actName);

    if (this.sharedItems[actName].userCount <= 1) {
      delete this.sharedItems[actName];
    } else {
      this.sharedItems[actName].userCount -= 1;
      item.price = Math.floor(
        this.sharedItems[actName].price / this.sharedItems[actName].userCount,
      );
      this.updateMap(actList, 'actList');
    }
    console.log(this.sharedItems);
    AsyncStorage.setItem('sharedItems', JSON.stringify(this.sharedItems)).catch(e => console.log('err', e.message));
  }

  addToGroupList(personName, payed) {
    const { personList } = this.state;
    if (payed && personName && !personList.has(personName)) {
      personList.set(personName, { payed, acts: [] });
      this.updateMap(personList, 'personList');
    }
  }

  render() {
    const { actList, personList } = this.props;
    return (
      <ImageBackground
        source={img}
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 8,
        }}
      >
        <InsertPersonRow parentFlatList={this} style={{ backgroundColor: '#e83a53' }} />
        <View style={{ flex: 0.7, marginTop: 12 }}>
          <FlatList
            data={mapKeys(personList).reverse()}
            renderItem={({ item }) => (
              <ActBox
                data={personList.get(item)}
                actList={actList}
                name={item}
                parentFlatList={this}
              />
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
        <View style={{ flex: 0.2, marginTop: 4, borderTopWidth: 1 }}>
          <FlatList
            data={mapKeys(actList)}
            horizontal={false}
            numColumns={3}
            renderItem={({ item }) => (
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  margin: 1,
                  marginTop: 4,
                }}
              >
                <PersonFlatListItem
                  item={actList.get(item)}
                  parentFlatList={this}
                  bgColor={actList.get(item).isShared ? '#eeffff' : '#bbdefb'}
                />
              </View>
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    actList: new Map(state.actList),
    personList: new Map(state.personList),
    sharedItems: state.sharedItems,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupScreen);
