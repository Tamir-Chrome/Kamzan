import React, { Component } from 'react';
import {
  FlatList, View, AsyncStorage, Text,
} from 'react-native';
import { Container, Icon, Button } from 'native-base';
import InsertActRow from '../../components/InsertRow/InsertActRow';
import ActFlatListItem from '../../components/FlatListItem/ActFlatListItem';

export default class ActListScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      actList: [],
    };
    // AsyncStorage.clear();
  }

  componentDidMount = () => AsyncStorage.getItem('actList')
    .then((value) => {
      if (value) this.setState({ actList: JSON.parse(value) });
    })
    .catch(e => console.error('err', e.message));

  updateActList(newList) {
    this.setState({ actList: newList });
    AsyncStorage.setItem('actList', JSON.stringify(newList)).catch(e => console.error('err', e.message));
  }

  deleteRow(index) {
    const { actList } = this.state;
    actList.splice(index, 1);

    this.updateActList(actList);
  }

  addToList(price, act) {
    if (price) {
      const newItem = { price, act, isShared: false };
      const { actList } = this.state;
      const tempData = [newItem, ...actList];
      this.updateActList(tempData);
    }
  }

  changeSharedItem(index) {
    const { actList } = this.state;
    actList[index].isShared = !actList[index].isShared;
    this.updateActList(actList);
  }

  hardReset() {
    AsyncStorage.clear();
    this.setState({ actList: [] });
  }

  render() {
    const { actList } = this.state;
    const { navigation } = this.props;
    return (
      <Container style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
        <InsertActRow parentFlatList={this} />
        <FlatList
          style={{ flex: 0.8 }}
          data={actList}
          renderItem={({ item, index }) => (
            <ActFlatListItem
              item={item}
              index={index}
              parentFlatList={this}
              bgColor={item.isShared ? '#b2ff59' : '#63E091'}
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
          <Button danger style={{ height: 32 }} onPress={() => this.hardReset()}>
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
