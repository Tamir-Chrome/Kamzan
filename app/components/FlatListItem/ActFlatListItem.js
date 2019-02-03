import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Text, CheckBox } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Icon } from 'native-base';

export default class ActFlatListItem extends Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  

  render() {
    const {
      id, actIndex, item, parent,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#2e3142',
        }}
      >
        <TouchableWithoutFeedback
          onLongPress={() => parent.showPrompt(item.name, actIndex)}
        >
          <View style={styles.itemContainer}>
            <Text style={{ flex: 0.5, color: 'white', marginLeft: 15, paddingRight: 22, fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text style={{ flex: 0.3, color: 'white', paddingLeft: 22, fontWeight: 'bold' }}>
              {item.price}
            </Text>
            <CheckBox
              style={{ flex: 0.1, paddingRight: 10 }}
              value={item.isShared}
              onValueChange={() => parent.changeSharedItem(actIndex)}
            />
            <View style={{ flex: 0.1, marginRight: 5 }}>
              <Icon
                name="minus"
                type="EvilIcons"
                style={{ fontSize: 32, color: '#ed8450' }}
                onPress={this.showActionSheet}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

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
                parent.deleteFromList(actIndex, id);
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

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

/*

        
*/