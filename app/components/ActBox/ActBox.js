/* @flow */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Icon } from 'native-base';
import ActList from './ActList';

export default class ActBox extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
    };
  }

  render() {
    const {
      parentFlatList, person, personIndex, actList,
    } = this.props;
    const { collapse } = this.state;
    return (
      <View style={{ flexDirection: 'column', marginVertical: 2 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            backgroundColor: '#424242',
            borderTopEndRadius: 8,
            borderTopStartRadius: 8,
            height: 23,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              parentFlatList.addAct(personIndex);
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 10, color: 'white' }}>
                {person.name}
              </Text>
              <Text style={{ marginLeft: 10, color: 'white' }}>
                {person.payed}
              </Text>
              <Icon
                name="edit"
                type="MaterialIcons"
                style={{ marginLeft: 10, color: 'white', fontSize: 19 }}
                onPress={() => parentFlatList.showPrompt(personIndex, person.name)}
              />
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon
              name={collapse ? 'plus' : 'minus'}
              type="EvilIcons"
              style={{ color: '#009B9F' }}
              onPress={() => {
                this.setState({ collapse: !collapse });
              }}
            />
            <Icon
              name="close"
              type="EvilIcons"
              style={{ color: '#C11B0F' }}
              onPress={() => parentFlatList.removeFromPersonList(personIndex)}
            />
          </View>
        </View>
        {!collapse && (
          <ActList
            actList={actList}
            parentFlatList={parentFlatList}
            personIndex={personIndex}
            person={person}
          />
        )}
      </View>
    );
  }
}

module.exports = ActBox;
