import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import PersonFlatListItem from '../../components/FlatListItem/PersonFlatListItem';
import ActBox from '../../components/ActBox/ActBox';
import EditPayedPrompt from '../../components/Modals/EditPayed';
import InsertRow from '../../components/InsertRow/InsertRow';
import { Container, Content, Header, FooterTab } from 'native-base';

import { mapKeys } from '../../util';

export default class GroupUI extends Component {
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
    const { actList, personList, parent } = this.props;
    return (
      <Container style={styles.container}>
        <EditPayedPrompt
          onRef={(ref) => {
            parent.prompt = ref;
          }}
          title="Edit payed value"
          message="Hit the switch to remove from amount"
          parentScreen={parent}
        />
        <Header style={styles.titleContainer}>
          <Text style={styles.title}>
            Split
          </Text>
        </Header>
        <Content>

            
              <View>
                <InsertRow leftPlaceholder={'person name'} rightPlaceholder={'payed'} addCB={parent.addToPersonList}  />
              </View>

            <View style={{ flex: 0.7, paddingBottom: 15 }}>
              <FlatList
                data={personList.slice().reverse()}
                renderItem={({ item, index }) => (
                  <ActBox
                    id={item[0]}
                    person={item[1]}
                    personIndex={personList.length - index - 1}
                    actList={actList}
                    parent={parent}
                  />
                )}
                keyExtractor={(item, index) => JSON.stringify(index)}
                extraData={actList}
              />
            </View>

            <View style={{ flex: 0.2, borderTopWidth: 1}}>
              <FlatList
                data={mapKeys(actList)}
                horizontal={false}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      margin: 30,
                      marginTop: 4,
                      flex: 1,
                    }}
                  >
                    <PersonFlatListItem
                      id={item}
                      item={actList.get(item)}
                      index={index}
                      parent={parent}
                      bgColor={actList.get(item).isShared ? '#eeffff' : '#bbdefb'}
                    />
                  </View>
                )}
                keyExtractor={(item, index) => JSON.stringify(index)}
                extraData={this.state}
              />
            </View>
            
            
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
  
        
        <InsertPersonRow parentFlatList={this} style={{ backgroundColor: '#e83a53' }} />
        
      </ImageBackground>
  */