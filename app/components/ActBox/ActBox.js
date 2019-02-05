/* @flow */
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
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
      parent, person, personIndex, actList,
    } = this.props;
    const { collapse } = this.state;
    return (
      <View style={{ flexDirection: 'column', marginVertical: 2 }}>
        <TouchableOpacity onPress={() => { parent.addAct(personIndex); }}>
          <View style={styles.itemContainer}>
            <Icon
              name="edit"
              type="MaterialIcons"
              style={{ marginLeft: 15, color: 'white', fontSize: 19, flex: 0.1 }}
              onPress={() => parent.showPrompt(personIndex, person.name)}
            />
            <Text style={{ flex: 0.4, color: 'white', marginLeft: 5, paddingRight: 22, fontWeight: 'bold' }}>
              {person.name}
            </Text>
            <Text style={{ flex: 0.3, color: 'white', paddingLeft: 22, fontWeight: 'bold' }}>
              {person.payed}
            </Text>
            <Icon
              name={collapse ? 'chevron-down' : 'chevron-right'}
              type="Entypo"
              style={{ color: '#009B9F', flex: 0.1, paddingRight: 10 }}
              onPress={() => {
                this.setState({ collapse: !collapse });
              }}
            />
            <View style={{ flex: 0.1, marginRight: 5 }}>
              <Icon
                name="minus"
                type="EvilIcons"
                style={{ fontSize: 32, color: '#ed8450' }}
                onPress={() => parent.removeFromPersonList(personIndex)}
              />
            </View>
          </View>
        </TouchableOpacity>
        {!collapse && (
          <ActList
            actList={actList}
            parent={parent}
            personIndex={personIndex}
            person={person}
          />
        )}
      </View>
    );
  }
}

module.exports = ActBox;

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2e3142',
  }
});