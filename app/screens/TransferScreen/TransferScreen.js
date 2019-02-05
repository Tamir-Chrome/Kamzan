/* @flow */
import React, { Component } from 'react';
import TransferUI from './TransferUI';
import { Icon } from 'native-base';
import { connect } from 'react-redux';


const img = require('../../images/wooden-board.jpg');

class TransferScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
    tabBarIcon: <Icon name="compare-arrows" type="MaterialIcons" style={{ color: 'white' }} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      transfers: [],
    };

    this.oweList = [];
    this.payersList = [];
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', this.onFocus);
  }

  componentWillUnmount() {
    const { navigation } = this.props;
    navigation.removeListener('willFocus', this.onFocus);
  }

  onFocus = () => {
    this.calcDiff();
    this.calcTransfer();
  };

  /**
   * calculte diff
   * diff = priceSum of items used - money used by person
   *
   * @memberof TransferScreen
   */
  calcDiff() {
    const { actList, personList } = this.props;
    // run over each person (sike!)
    personList.forEach((person) => {
      let priceSum = 0;
      person[1].acts.forEach((item) => {
        const act = actList.get(item);

        priceSum += parseFloat(
          act.isShared ? Math.round((act.price / act.users) * 100) / 100 : act.price,
          10,
        );
      });

      const diff = priceSum - parseInt(person[1].payed, 10);

      if (diff > 0) this.oweList.push([person[1].name, diff]);
      else this.payersList.push([person[1].name, diff * -1]);
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
      <TransferUI transfers={transfers} />
    );
  }
}

function mapStateToProps(state) {
  return {
    actList: new Map(state.actList),
    personList: state.personList,
  };
}

export default connect(mapStateToProps)(TransferScreen);
