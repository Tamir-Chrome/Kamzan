import React, { Component } from 'react';
import { FlatList, View, AsyncStorage } from 'react-native';
import { Container, Icon } from 'native-base';
import PersonFlatListItem from '../../components/FlatListItem/PersonFlatListItem';
import ActBox from '../../components/ActBox/ActBox';
import InsertPersonRow from '../../components/InsertRow/InserPersonRow';

export default class GroupScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      actList: [],
      groupList: [],
    };
    this.actSelectedIndex = -1;
    // AsyncStorage.clear();
  }

  componentDidMount = () => AsyncStorage.multiGet(['actList', 'groupList'])
    .then((value) => {
      this.setState({
        actList: value[0][1] != null ? JSON.parse(value[0][1]) : [],
        groupList: value[1][1] != null ? JSON.parse(value[1][1]) : [],
      });
    })
    .catch(e => console.log('err (didMount)', e.message));

  setActSelectedIndex = (index) => {
    this.actSelectedIndex = index;
  }

  updateGroupList = (newList) => {
    this.setState({ groupList: newList });
    AsyncStorage.setItem('groupList', JSON.stringify(newList)).catch(e => console.log('err', e.message));
  };

  deleteRowFromList = (index) => {
    const { groupList } = this.state;
    groupList.splice(index, 1);
    this.updateGroupList(groupList);
  };

  addAct = (index) => {
    if (index !== -1 && this.actSelectedIndexactSelectedIndex !== -1) {
      const { groupList, actList } = this.state;
      const item = actList[this.actSelectedIndex];
      groupList[index].acts.push(item);

      const isActShared = item.isShared;
      // add to shared item list
      if (isActShared) {
        AsyncStorage.getItem('sharedItems')
          .then((value) => {
            // userName = tempGroupList[index].name;
            let tempDict = {};
            if (value) {
              tempDict = JSON.parse(value);
              if (item.act in tempDict) tempDict[item.act].personIndex.push(index);
              else tempDict[item.act] = { price: item.price, personIndex: [index] };
            } else tempDict[item.act] = { price: item.price, personIndex: [index] };

            console.log('{add}: ', tempDict);

            AsyncStorage.setItem('sharedItems', JSON.stringify(tempDict)).catch(e => console.log('err (add to sharedItems)', e.message));
          })
          .catch(e => console.log('err (get from sharedItems)', e.message));
      }

      this.actSelectedIndex = -1;
      this.updateGroupList(groupList);
    }
  };

  removeAct = (groupSelectedIndex, actIndex) => {
    const { groupList } = this.state;
    const isActShared = groupList[groupSelectedIndex].acts[actIndex].isShared;
    // const tempActIndex = actIndex;
    // remove from shared item list
    if (isActShared) {
      const tempActName = groupList[groupSelectedIndex].acts[actIndex].act;
      // tempPersonName = tempData[groupSelectedIndex].name;
      AsyncStorage.getItem('sharedItems')
        .then((value) => {
          const tempDict = JSON.parse(value);
          console.log('...', tempDict, tempActName);

          const indexOfUser = tempDict[tempActName].personIndex.indexOf(groupSelectedIndex);
          tempDict[tempActName].personIndex.splice(indexOfUser, 1);
          AsyncStorage.setItem('sharedItems', JSON.stringify(tempDict)).catch(e => console.log('err (remove to sharedItems)', e.message));
          console.log('{remove}: ', tempDict);
        })
        .catch(e => console.log('err (get from sharedItems)', e.message));
    }

    groupList[groupSelectedIndex].acts.splice(actIndex, 1);

    this.updateGroupList(groupList);
  };

  addToGroupList(personName, payedAmount) {
    const newItem = {
      name: personName,
      acts: [],
      payed: payedAmount,
    };
    const { groupList } = this.state;
    groupList.push(newItem);
    this.updateGroupList(groupList);
  }

  render() {
    const { actList, groupList } = this.state;
    const { navigation } = this.props;
    return (
      <Container
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 8,
        }}
      >
        <InsertPersonRow parentFlatList={this} />
        <View style={{ flex: 0.6, marginTop: 12 }}>
          <FlatList
            data={groupList}
            renderItem={({ item, index }) => (
              <ActBox data={item} index={index} parentFlatList={this} />
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
        <View style={{ flex: 0.2, marginTop: 4 }}>
          <FlatList
            data={actList}
            horizontal={false}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View
                style={{
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  margin: 1,
                }}
              >
                <PersonFlatListItem
                  item={item}
                  index={index}
                  parentFlatList={this}
                  bgColor={item.isShared ? '#b2ff59' : '#63E091'}
                />
              </View>
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={actList}
          />
        </View>

        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'center' }}>
          <Icon
            active
            style={{ color: '#e01d50' }}
            name="navigate-next"
            type="MaterialIcons"
            onPress={() => navigation.navigate('Transfers')}
          />
        </View>
      </Container>
    );
  }
}
