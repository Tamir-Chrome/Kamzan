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

export default class InsertRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftVar: '',
      rightVar: '',
    };
  }

  render() {
    const { leftPlaceholder, rightPlaceholder, addCB } = this.props;
    const { leftVar, rightVar } = this.state;
    return (
      <View style={styles.container}>
        <InputBox flex={0.5} keyboardType={'default'} parent={this} type={'leftVar'} placeholder={leftPlaceholder}/>
        <InputBox flex={0.2} keyboardType={'number-pad'} parent={this} type={'rightVar'} placeholder={rightPlaceholder}/>
        <Button style={styles.addBtn} onPress={() => addCB(leftVar, rightVar)}>
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

module.exports = InsertRow;

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
