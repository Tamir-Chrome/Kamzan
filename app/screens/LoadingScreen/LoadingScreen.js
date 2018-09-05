import React, { Component } from 'react';
import { Image, View } from 'react-native';

const loadImage = require('../../images/load-image.png');

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      >
        <Image source={loadImage} />
      </View>
    );
  }
}
