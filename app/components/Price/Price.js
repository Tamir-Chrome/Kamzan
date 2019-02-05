/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import toMaterialStyle from 'material-color-hash';

export default class Price extends PureComponent {
  render() {
    const { bgColor, price, act } = this.props;
    const style = toMaterialStyle(act + price);

    return (
      <View>
        <View
          style={{
            backgroundColor: style['backgroundColor'],
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingVertical: 5,
            borderRadius: 5,
            marginVertical: 6,
            flex: 1,
          }}
        >
          <Text style={{ color: 'white', marginLeft: 10 }}>
            {act}
            {' '}
          </Text>
          <Text style={{ color: 'white', marginRight: 10 }}>
            {price}
          </Text>
        </View>
      </View>
    );
  }
}

module.exports = Price;
