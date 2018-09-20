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
      parentFlatList, person, personIndex, actList,
    } = this.props;

    console.log('acts: ', person.acts);
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
              parentFlatList.addAct(personIndex);
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: 10, color: 'white' }}>
                {person.name}
              </Text>
              <Text style={{ marginLeft: 10, color: 'white' }}>
                {person.payed}
              </Text>
            </View>
          </TouchableOpacity>
          <Icon
            name="close"
            type="EvilIcons"
            style={{ color: '#C11B0F' }}
            onPress={() => parentFlatList.removeFromPersonList(personIndex)}
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
            data={person.acts}
            horizontal={false}
            numColumns={3}
            renderItem={({ item, index }) => (
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
                    parentFlatList.removeAct(personIndex, item, index);
                  }}
                >
                  <Price
                    price={
                      actList.get(item).isShared
                        ? Math.round((actList.get(item).price / actList.get(item).users) * 100)
                          / 100
                        : actList.get(item).price
                    }
                    act={actList.get(item).name}
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
