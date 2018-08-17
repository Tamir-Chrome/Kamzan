/* @flow */
import React, { Component } from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import Price from '../Price/Price';

export default class ActBox extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      parentFlatList, name, data, actList,
    } = this.props;
    return (
      <View style={{ height: 115, flexDirection: 'column', marginVertical: 4 }}>
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#424242',
            borderTopEndRadius: 8,
            borderTopStartRadius: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              parentFlatList.addAct(name);
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 10, color: 'white' }}>
                {name}
              </Text>
              <Text style={{ marginLeft: 10, color: 'white' }}>
                {data.payed}
              </Text>
            </View>
          </TouchableOpacity>
          <Icon
            name="close"
            type="EvilIcons"
            style={{ color: '#C11B0F' }}
            onPress={() => parentFlatList.deleteRowFromList(name)}
          />
        </View>
        <View
          style={{
            flex: 0.8,
            backgroundColor: '#E0E0E0',
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
          }}
        >
          <FlatList
            style={{ marginLeft: 4, marginTop: 4 }}
            data={data.acts}
            horizontal={false}
            numColumns={3}
            renderItem={({ item }) => (
              <View
                style={{
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  margin: 1,
                  height: 32,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    parentFlatList.removeAct(name, item);
                  }}
                >
                  <Price
                    price={actList.get(item).price}
                    act={item}
                    bgColor={actList.get(item).isShared ? '#eeffff' : '#bbdefb'}
                  />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

module.exports = ActBox;
