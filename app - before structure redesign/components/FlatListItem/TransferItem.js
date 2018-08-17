/* @flow */
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Badge, Icon } from 'native-base';

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
        }}
      >
        <Badge
          rounded
          style={{
            flexDirection: 'row',
            height: 32,
            backgroundColor: '#63e091',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>
            {owerName}
          </Text>
        </Badge>
        <Icon name="long-arrow-right" type="FontAwesome" style={{ color: '#63e091' }} />
        <Badge
          rounded
          style={{
            flexDirection: 'row',
            height: 32,
            backgroundColor: '#63e091',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>
            {amount}
          </Text>
        </Badge>
        <Icon name="long-arrow-right" type="FontAwesome" style={{ color: '#63e091' }} />
        <Badge
          rounded
          style={{
            flexDirection: 'row',
            height: 32,
            backgroundColor: '#63e091',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white' }}>
            {payerName}
          </Text>
        </Badge>
      </View>
    );
  }
}

module.exports = Price;
