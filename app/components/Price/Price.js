/* @flow */
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Badge, Text } from 'native-base';

export default class Price extends PureComponent {
  render() {
    const { bgColor, price, act } = this.props;
    return (
      <View>
        <Badge
          style={{
            backgroundColor: bgColor,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Text style={{ color: '#424242' }}>
            {price}
            {' '}
          </Text>
          <Text style={{ color: '#424242' }}>
            {act}
          </Text>
        </Badge>
      </View>
    );
  }
}

module.exports = Price;
