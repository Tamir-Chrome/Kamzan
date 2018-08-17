import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Price from '../Price/Price';

export default class PersonFlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      name, price, bgColor, parentFlatList,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          parentFlatList.setSelectedActName(name);
        }}
      >
        <View>
          <Price price={price} act={name} bgColor={bgColor} />
        </View>
      </TouchableOpacity>
    );
  }
}

// TODO:merge all flatListItem components
module.exports = PersonFlatListItem;
