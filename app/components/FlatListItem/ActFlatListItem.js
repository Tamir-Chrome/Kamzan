import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Icon } from 'native-base';
import Price from '../Price/Price';

export default class ActFlatListItem extends Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  changeSharedItem(parentFlatList, name) {
    const { bgColor } = this.props;
    this.props.bgColor = bgColor === '#63E091' ? '#59c959' : '#63E091';
    parentFlatList.changeSharedItem(name);
  }

  render() {
    const {
      id, actIndex, item, parentFlatList, bgColor,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 3,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => this.changeSharedItem(parentFlatList, item.name)}
          onLongPress={() => parentFlatList.showPrompt(item.name)}
        >
          <View>
            <Price price={item.price} act={item.name} bgColor={bgColor} />
          </View>
        </TouchableWithoutFeedback>
        <Icon
          name="close"
          type="EvilIcons"
          style={{ fontSize: 32, color: '#C11B0F' }}
          onPress={this.showActionSheet}
        />
        <ActionSheet
          ref={(ref) => {
            this.ActionSheet = ref;
          }}
          title="Choose action"
          options={['Delete', 'cancel']}
          cancelButtonIndex={1}
          destructiveButtonIndex={0}
          onPress={(index) => {
            switch (index) {
              case 0:
                parentFlatList.deleteFromList(actIndex, id);
                break;
              default:
                break;
            }
          }}
        />
      </View>
    );
  }
}

module.exports = ActFlatListItem;
