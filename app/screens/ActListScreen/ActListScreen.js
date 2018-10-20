import React, { Component } from 'react';
import {
  FlatList, View, AsyncStorage, ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InsertActRow from '../../components/InsertRow/InsertActRow';
import ActFlatListItem from '../../components/FlatListItem/ActFlatListItem';
import EditValuePrompt from '../../components/Modals/EditValue';
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
      <ImageBackground
        source={img}
        style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}
      >
        <EditValuePrompt
          onRef={(ref) => {
            this.prompt = ref;
          }}
          title="Edit act"
          message="edit price and name of act"
          parentScreen={this}
        />
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 24,
            marginTop: 7,
          }}
        >
          <View style={{}}>
            <Icon
              active
              style={{ color: '#C11B0F' }}
              name="delete-forever"
              type="MaterialIcons"
              onPress={() => {
                AsyncStorage.clear();
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <InsertActRow parentFlatList={this} />
          </View>
        </View>
        <FlatList
          style={{ flex: 0.8 }}
          data={actList.slice().reverse()}
          renderItem={({ item, index }) => (
            <ActFlatListItem
              id={item[0]}
              actIndex={index}
              item={item[1]}
              parentFlatList={this}
              bgColor={item[1].isShared ? '#eeffff' : '#bbdefb'}
            />
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
          extraData={actList}
        />
      </ImageBackground>
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
