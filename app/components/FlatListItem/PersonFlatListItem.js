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
      id, item, index, bgColor, parent,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          parent.addSelectedAct(id, index);
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
