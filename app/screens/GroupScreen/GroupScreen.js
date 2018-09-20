import React, { Component } from 'react';
import {
  FlatList, View, AsyncStorage, ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonFlatListItem from '../../components/FlatListItem/PersonFlatListItem';
import ActBox from '../../components/ActBox/ActBox';
import InsertPersonRow from '../../components/InsertRow/InserPersonRow';
import { mapToJson, mapKeys } from '../../util';
import * as Actions from '../../actions';

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

  // only for actList and personList
  updateMap = (newList, listName) => {
    this.setState({ [listName]: newList });
    AsyncStorage.setItem(listName, mapToJson(newList)).catch(e => console.log('err', e.message));
  };

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

  addSelectedAct(actId, actIndex) {
    const { selectedActs, selectedActsIndexes } = this.state;
    selectedActs.push(actId);
    selectedActsIndexes.push(actIndex);
    this.setState({ selectedActs, selectedActsIndexes });
  }

  removeFromPersonList(personIndex) {
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

  addToPersonList(personName, payed) {
    const { addPerson } = this.props;
    if (payed && personName) {
      // v4 - random uuid - statisticly will not fuck up in my life time
      const personId = uuidv4();
      addPerson(personId, personName, payed);
    }
  }

  render() {
    const { actList, personList } = this.props;
    return (
      <ImageBackground
        source={img}
        style={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'flex-start',
          paddingTop: 8,
        }}
      >
        <InsertPersonRow parentFlatList={this} style={{ backgroundColor: '#e83a53' }} />
        <View style={{ flex: 0.7, marginTop: 12 }}>
          <FlatList
            data={personList.slice().reverse()}
            renderItem={({ item, index }) => (
              <ActBox
                id={item[0]}
                person={item[1]}
                personIndex={personList.length - index - 1}
                actList={actList}
                parentFlatList={this}
              />
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
        <View style={{ flex: 0.2, marginTop: 4, borderTopWidth: 1 }}>
          <FlatList
            data={mapKeys(actList)}
            horizontal={false}
            numColumns={3}
            renderItem={({ item, index }) => (
              <View
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  margin: 1,
                  marginTop: 4,
                }}
              >
                <PersonFlatListItem
                  id={item}
                  item={actList.get(item)}
                  index={index}
                  parentFlatList={this}
                  bgColor={actList.get(item).isShared ? '#eeffff' : '#bbdefb'}
                />
              </View>
            )}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
      </ImageBackground>
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
