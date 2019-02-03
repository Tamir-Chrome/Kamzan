/* @flow */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'native-base';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { flex, placeholder, parent, type } = this.props;
    return (
      <View style={[styles.container, {flex: flex}]}>
        <Input
          maxLength={32}
          keyboardType="default"
          placeholderTextColor="#d0d0d0"
          placeholder={placeholder}
          onChangeText={text => parent.setState({ [type]: text })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#f4f4f4',
      height: 40,
      borderRadius: 7,
      borderColor: '#d0d0d0',
      borderWidth: 0.5,
      elevation: 2,
  }
});
