import React, { Component } from 'react';
import {
    FlatList, View, AsyncStorage, StyleSheet, Text,
  } from 'react-native';
import InsertRow from '../../components/InsertRow/InsertRow';
import ActFlatListItem from '../../components/FlatListItem/ActFlatListItem';
import EditValuePrompt from '../../components/Modals/EditValue';
import { Container, Content, Header, Icon } from 'native-base';

export default class ActListUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE',
        }}
      />
    );
  };

  render() {
    const { actList, parent } = this.props;
    return (
      <Container style={styles.container}>
        <EditValuePrompt
          onRef={(ref) => {
            parent.prompt = ref;
          }}
          title="Edit act"
          message="edit price and name of act"
          parentScreen={parent}
        />
        <Header style={styles.titleContainer}>
          <Text style={styles.title}>
            Split
          </Text>
        </Header>
        <Content>
        <View style={{ flex: 1 }}>
            <InsertRow leftPlaceholder={'product name'} rightPlaceholder={'price'} addCB={parent.addToList}  />
          </View>

        <FlatList
          style={{ flex: 0.8 }}
          data={actList.slice().reverse()}
          renderItem={({ item, index }) => (
            <ActFlatListItem
              id={item[0]}
              actIndex={index}
              item={item[1]}
              parent={parent}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => JSON.stringify(index)}
          extraData={actList}
        />
        
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    titleContainer: {
      backgroundColor: '#2e3142',
      height: 50,
      flexDirection: 'row',
    },
    title: {
      fontSize: 19,
      fontWeight: 'bold',
      color: 'white',
      alignSelf: 'center',
      width: 50,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#e8e8e8'
    }
  });

  /*
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
  */