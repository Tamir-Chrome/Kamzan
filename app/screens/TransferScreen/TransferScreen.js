/* @flow */
import React, { Component } from 'react';
import { View, AsyncStorage, FlatList } from 'react-native';
import TransferItem from '../../components/FlatListItem/TransferItem';
import { jsonToMap } from '../../util';

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

    this.tempPersonList = new Map([]);
    this.tempActList = new Map([]);
    this.sharedValueToAdd = {};
    this.oweList = [];
    this.payersList = [];
  }

  componentDidMount = () => AsyncStorage.multiGet(['personList', 'actList'])
    .then((value) => {
      this.tempPersonList = value[0][1] != null ? jsonToMap(value[0][1]) : new Map([]);
      this.tempActList = value[1][1] != null ? jsonToMap(value[1][1]) : new Map([]);

      this.calcDiff();
      this.calcTransfer();
    })
    .catch(e => console.log('err (didMount)', e.message));

  /**
   * calculte diff
   * diff = priceSum of items used - money used by person
   *
   * @memberof TransferScreen
   */
  calcDiff() {
    // run over each person (pun intended)
    this.tempPersonList.forEach((person, name) => {
      let priceSum = 0;
      person.acts.forEach((item) => {
        priceSum += parseInt(this.tempActList.get(item).price, 10);
      });

      const diff = priceSum - parseInt(person.payed, 10);
      console.log(name, diff);

      if (diff > 0) this.oweList.push([name, diff]);
      else this.payersList.push([name, diff * -1]);
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
      <View style={{ backgroundColor: '#e83a53' }}>
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
