import React, { Component } from 'react';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GroupUI from './GroupUI';

import * as Actions from '../../actions';
import { mapKeys } from '../../util';


const uuidv4 = require('uuid/v4');
const img = require('../../images/wooden-board.jpg');

class GroupScreen extends Component {
  // remove header from react-navigation
  static navigationOptions = {
    header: null,
    tabBarIcon: <Icon name="group" type="MaterialIcons" style={{ color: 'white' }} />,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedActs: [],
      selectedActsIndexes: [],
    };
  }

  addAct = (personIndex) => {
    const { selectedActs, selectedActsIndexes } = this.state;
    if (selectedActs.length !== 0) {
      const { addActs } = this.props;
      addActs(personIndex, selectedActs, selectedActsIndexes);
      this.setState({ selectedActs: [], selectedActsIndexes: [] });
    }
  };

  removeAct = (personIndex, actId, personActIndex) => {
    const { actList, removePersonAct } = this.props;
    const actsKeys = mapKeys(actList);
    const actIndex = actsKeys.indexOf(actId);
    removePersonAct(personIndex, actIndex, personActIndex);
  };

  addSelectedAct = (actId, actIndex) => {
    const { selectedActs, selectedActsIndexes } = this.state;
    selectedActs.push(actId);
    selectedActsIndexes.push(actIndex);
    this.setState({ selectedActs, selectedActsIndexes });
  }

  removeFromPersonList = (personIndex) => {
    const { removePerson, actList, personList } = this.props;

    // convert the acts list of a person
    // to a list of their indexes
    const actsIndex = [];
    const actKeys = mapKeys(actList);
    personList[personIndex][1].acts.forEach((actId) => {
      actsIndex.push(actKeys.indexOf(actId));
    });

    removePerson(personIndex, actsIndex);
  }

  addToPersonList = (personName, payed) => {
    const { addPerson } = this.props;
    if (payed && personName) {
      // v4 - random uuid - statisticly will not fuck up in my life time
      const personId = uuidv4();
      addPerson(personId, personName, payed);
    }
  }

  showPrompt = (personIndex, personName) => {
    this.prompt.setModalVisible(true, personIndex, personName);
  }

  submitInput = (value, sign, personIndex) => {
    const { editPayed } = this.props;
    editPayed(personIndex, value * sign);
  }

  render() {
    const { actList, personList } = this.props;
    return (
      <GroupUI parent={this} actList={actList} personList={personList}/>
    );
  }
}

function mapStateToProps(state) {
  return {
    actList: new Map(state.actList),
    personList: state.personList,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupScreen);
