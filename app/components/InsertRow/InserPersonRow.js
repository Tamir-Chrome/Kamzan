import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Item, Input } from 'native-base';

export default class InsertPersonRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      payed: '',
    };
  }

  render() {
    const { parentFlatList } = this.props;
    const { name, payed } = this.state;
    return (
      <View
        style={{
          flex: 0.1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: 24,
          marginTop: 7,
        }}
      >
        <Item rounded style={{ flexDirection: 'row', height: 32, backgroundColor: '#607d8b' }}>
          <View style={{ height: 40, width: 100 }}>
            <Input
              maxLength={13}
              style={{ color: 'white' }}
              placeholderTextColor="white"
              keyboardType="default"
              placeholder="name"
              onChangeText={text => this.setState({ name: text })}
            />
          </View>
          <Icon name="dots-three-vertical" type="Entypo" style={{ color: 'white', fontSize: 15 }} />
          <View style={{ height: 40, width: 100 }}>
            <Input
              maxLength={8}
              style={{ color: 'white' }}
              placeholderTextColor="white"
              keyboardType="numeric"
              placeholder="payed"
              onChangeText={text => this.setState({ payed: text })}
            />
          </View>
        </Item>
        <View style={{ marginLeft: 4 }}>
          <Icon
            style={{ color: '#e01d50', fontSize: 32 }}
            name="playlist-add"
            type="MaterialIcons"
            onPress={() => parentFlatList.addToPersonList(name, payed)}
          />
        </View>
      </View>
    );
  }
}

module.exports = InsertPersonRow;
