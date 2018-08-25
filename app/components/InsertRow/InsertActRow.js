/* @flow */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Item, Input, Icon } from 'native-base';

/*
actList: [
    name: {
        price: xxx,
        isShared: false
    }
]
*/

export default class InsertActRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      act: '',
    };
  }

  render() {
    const { parentFlatList } = this.props;
    const { act, price } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Item rounded style={{ flexDirection: 'row', height: 32, backgroundColor: '#607d8b' }}>
          <View style={{ height: 40, width: 50 }}>
            <Input
              maxLength={3}
              style={{ color: 'white' }}
              placeholderTextColor="white"
              keyboardType="numeric"
              placeholder="price"
              onChangeText={text => this.setState({ price: text })}
            />
          </View>
          <Icon name="dots-three-vertical" type="Entypo" style={{ color: 'white', fontSize: 15 }} />
          <View style={{ height: 40, width: 100 }}>
            <Input
              maxLength={8}
              style={{ color: 'white' }}
              placeholderTextColor="white"
              keyboardType="default"
              placeholder="action"
              onChangeText={text => this.setState({ act: text })}
            />
          </View>
        </Item>
        <View style={{ marginLeft: 4 }}>
          <Icon
            style={{ color: '#e01d50', fontSize: 32 }}
            name="playlist-add"
            type="MaterialIcons"
            onPress={() => parentFlatList.addToList(price, act)}
          />
        </View>
      </View>
    );
  }
}

module.exports = InsertActRow;
