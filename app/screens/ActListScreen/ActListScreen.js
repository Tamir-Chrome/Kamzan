import React, { Component } from 'react';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ActListUI from './ActListUI';
import * as Actions from '../../actions';

const uuidv4 = require('uuid/v4');
const img = require('../../images/wooden-board.jpg');

/**
 *
 *
 * @export
 * @class ActListScreen
 * @extends {Component}
 *
 * @field
 * actList is a map that stores the keys as the name of the act and value as the properties of it
 */
class ActListScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
    tabBarIcon: <Icon name="list" type="MaterialIcons" style={{ color: 'white' }} />,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  deleteFromList(index, id) {
    const { removeAct, actList } = this.props;
    const size = actList.length;
    removeAct(size - index - 1, id);
  }

  addToList(price, name) {
    if (price && name) {
      const { addAct } = this.props;
      // v4 - random uuid - statisticly will not fuck up in my life time
      const actId = uuidv4();
      addAct(actId, name, price);
      // dispatch({ type: 'ADD_ACT', actId, item: { name, price, isShared: false } });
    }
  }

  changeSharedItem(indexOfAct) {
    // check if item is used TODO: ADD ALERT
    const { changeShared, actList } = this.props;
    const size = actList.length;
    changeShared(size - indexOfAct - 1);
  }

  showPrompt(actName, indexOfAct) {
    this.prompt.setModalVisible(true, actName, indexOfAct);
  }

  submitInput(newName, newPrice, indexOfAct) {
    const { actList, editAct } = this.props;
    const realIndex = actList.length - indexOfAct - 1;
    const { name, price } = actList[realIndex][1];

    editAct(
      newName || name,
      newPrice || price,
      realIndex,
    );
  }

  render() {
    const { actList } = this.props;
    return (
      <ActListUI actList={actList} parent={this}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    actList: state.actList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActListScreen);

