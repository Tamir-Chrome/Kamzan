import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import Price from '../Price/Price';

export default class ActList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      actList, person, parentFlatList, personIndex,
    } = this.props;
    return (
      <View
        style={{
          height: 92,
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
                      ? Math.round((actList.get(item).price / actList.get(item).users) * 100) / 100
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
    );
  }
}
