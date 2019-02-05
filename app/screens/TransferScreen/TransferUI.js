import React, { Component } from 'react';
import {
    FlatList, View, StyleSheet, Text,
  } from 'react-native';
import { Container, Content, Header } from 'native-base';
import TransferItem from '../../components/FlatListItem/TransferItem';

export default class TransferUI extends Component {
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
    const { transfers } = this.props;
    return (
      <Container style={styles.container}>
        <Header style={styles.titleContainer}>
          <Text style={styles.title}>
            Split
          </Text>
        </Header>
        <Content>

        <FlatList
          style={{ marginTop: 7 }}
          data={transfers}
          renderItem={({ item }) => (
            <TransferItem owerName={item[0]} amount={Math.round(item[2] * 100) / 100} payerName={item[1]} />
          )}
          keyExtractor={(item, index) => JSON.stringify(index)}
          extraData={this.state}
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
<ImageBackground
        source={img}
        style={{ flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}
      >
        
      </ImageBackground>
*/