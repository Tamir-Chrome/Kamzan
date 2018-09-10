import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Price from '../Price/Price';

export default class PersonFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item, bgColor, parentFlatList } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          parentFlatList.setSelectedActName(item.name);
        }}
      >
        <View>
          <Price price={item.price} act={item.name} bgColor={bgColor} />
        </View>
      </TouchableOpacity>
    );
  }
}

// TODO:merge all flatListItem components
module.exports = PersonFlatListItem;
