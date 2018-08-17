/* @flow */
import React, { Component } from 'react';
import { View, AsyncStorage, FlatList } from 'react-native';
import TransferItem from '../../components/FlatListItem/TransferItem';

export default class TransferScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      transfers: [],
    };

    this.tempPersonList = [];
    this.tempSharedItems = {};
    this.sharedValueToAdd = {};
    this.oweList = [];
    this.payersList = [];
  }

  componentDidMount = () => AsyncStorage.multiGet(['groupList', 'sharedItems'])
    .then((value) => {
      this.tempPersonList = value[0][1] != null ? JSON.parse(value[0][1]) : [];
      this.tempSharedItems = value[1][1] != null ? JSON.parse(value[1][1]) : {};
      if (this.tempSharedItems.length > 0) this.prepareSharedItems();
      this.calcDiff();
      this.calcTransfer();
    })
    .catch(e => console.log('err (didMount)', e.message));

  prepareSharedItems() {
    this.tempSharedItems.forEach((sharedItem) => {
      const priceForOne = Math.floor(sharedItem.price / sharedItem.personIndex.length);
      sharedItem.personIndex.forEach((i) => {
        if (this.tempPersonList[i].name in this.sharedValueToAdd) {
          this.sharedValueToAdd[this.tempPersonList[i].name] += priceForOne;
        } else this.sharedValueToAdd[this.tempPersonList[i].name] = priceForOne;
      });
    });
  }

  calcDiff() {
    this.tempPersonList.forEach((element) => {
      let priceSum = 0;
      if (element.name in this.sharedValueToAdd) priceSum = this.sharedValueToAdd[element.name];
      element.acts.forEach((item) => {
        if (!item.isShared) priceSum += parseInt(item.price, 10);
      });

      const diff = priceSum - parseInt(element.payed, 10);

      if (diff > 0) this.oweList.push([element.name, diff]);
      else this.payersList.push([element.name, diff * -1]);
    });

    this.oweList.sort((a, b) => a[1] - b[1]);
    this.payersList.sort((a, b) => b[1] - a[1]);
  }

  calcTransfer() {
    const tempTransfers = [];

    while (this.oweList.length !== 0) {
      const ower = this.oweList.shift();

      while (this.payersList.length !== 0) {
        const payerName = this.payersList[0][0];
        const payerValue = this.payersList[0][1];

        // if ower need to give more then the payers needs to recieve
        if (payerValue < ower[1]) {
          tempTransfers.push([ower[0], payerName, payerValue]);
          ower[1] -= payerValue;
          this.payersList[0][1] = 0;
        } else {
          console.log(payerName, payerValue, ower[0], ower[1]);
          tempTransfers.push([ower[0], payerName, ower[1]]);
          this.payersList[0][1] = payerValue - ower[1];
          ower[1] = 0;
        }

        // check if 0
        if (this.payersList[0][1] === 0) {
          this.payersList.shift();
        }

        if (ower[1] <= 0) {
          break;
        }
      }
    }
    this.setState({ transfers: tempTransfers });
  }

  render() {
    const { transfers } = this.state;
    return (
      <View>
        <FlatList
          style={{ marginTop: 7 }}
          data={transfers}
          renderItem={({ item }) => (
            <TransferItem owerName={item[0]} amount={item[2]} payerName={item[1]} />
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
          extraData={this.state}
        />
      </View>
    );
  }
}

module.exports = TransferScreen;
