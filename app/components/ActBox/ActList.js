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
      actList, person, parent, personIndex,
    } = this.props;
    return (
      <View
        style={{
          maxHeight: 92,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: 2,
          borderColor: '#2e3142',
          borderBottomEndRadius: 8,
          borderBottomStartRadius: 8,
        }}
      >
        <FlatList
          data={person.acts}
          horizontal={false}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                height: 32,
                marginVertical: 6,
                flex: 1
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  parent.removeAct(personIndex, item, index);
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
          extraData={parent.state}
        />
      </View>
    );
  }
}
