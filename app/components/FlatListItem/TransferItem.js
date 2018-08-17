/* @flow */
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';

export default class Price extends PureComponent {
  render() {
    const { owerName, payerName, amount } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginVertical: 4,
          backgroundColor: '#E0E0E0',
        }}
      >
        <Text style={{ color: '#424242', fontSize: 20, fontFamily: 'Gill Sans' }}>
          {owerName}
        </Text>
        <Icon name="long-arrow-right" type="FontAwesome" style={{ color: '#424242' }} />
        <Text
          style={{
            color: '#424242',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Gill Sans',
          }}
        >
          {amount}
        </Text>
        <Icon name="long-arrow-right" type="FontAwesome" style={{ color: '#424242' }} />
        <Text style={{ color: '#424242', fontSize: 20, fontFamily: 'Gill Sans' }}>
          {payerName}
        </Text>
      </View>
    );
  }
}

module.exports = Price;
