/* @flow */
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import InputBox from '../InputBox/InputBox';

/*
actList: [
    name: {
        price: xxx,
        isShared: false
    }
]
*/

export default class InsertActRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      act: '',
    };
  }

  render() {
    const { parent } = this.props;
    const { act, price } = this.state;
    return (
      <View style={styles.container}>
        <InputBox flex={0.5} parent={this} type={'act'} placeholder={'product name'}/>
        <InputBox flex={0.2} parent={this} type={'price'} placeholder={'price'} style={{backgroundColor:'red'}}/>
        <Button style={styles.addBtn} onPress={() => parent.addToList(price, act)}>
          <View style={styles.addTextView}>
            <Text style={styles.addTextBtn}>
              ADD
            </Text>
          </View>
        </Button>
      </View>
    );
  }
}

module.exports = InsertActRow;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent: 'center',
      backgroundColor: '#e8e8e8',
      height: 80,
  },
  addBtn: {
    color: 'white',
    backgroundColor: '#2e3142',
    flex: 0.2,
    borderRadius: 5,
    alignSelf: 'center',
    height: 40,
  },
  addTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addTextBtn: {
    color: 'white',
  }
});

/*
<Item rounded style={{ flexDirection: 'row', height: 32, backgroundColor: '#607d8b' }}>
          <View style={{ height: 40, width: 50 }}>
            <Input
              style={{ color: 'white' }}
              placeholderTextColor="white"
              keyboardType="numeric"
              placeholder="price"
              onChangeText={text => this.setState({ price: text })}
            />
          </View>
          <Icon name="dots-three-vertical" type="Entypo" style={{ color: 'white', fontSize: 15 }} />
          <View style={{ height: 40, width: 100 }}>
            <Input
              maxLength={8}
              style={{ color: 'white' }}
              placeholderTextColor="white"
              keyboardType="default"
              placeholder="action"
              onChangeText={text => this.setState({ act: text })}
            />
          </View>
        </Item>
        <View style={{ marginLeft: 4 }}>
          <Icon
            style={{ color: '#e01d50', fontSize: 32 }}
            name="playlist-add"
            type="MaterialIcons"
            onPress={() => parentFlatList.addToList(price, act)}
          />
        </View>
*/