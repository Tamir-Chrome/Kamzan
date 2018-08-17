/* @flow */
import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Button,
  Badge,
  Text,
  Content,
  Header,
  Footer,
  Icon
} from "native-base";
import Price from "../../components/Price/Price";

data = [];

export class ActBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false
    };
  }
  /*
  componentDidMount = () =>
    AsyncStorage.getItem("data")
      .then(value => {
        if (value) {
          data = JSON.parse(value);
          this.setState({ refresh: !this.state.refresh });
        }
      })
      .catch(e => console.log("err", e.message));
    */
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={{ height: 115, flexDirection: "column", marginVertical: 4 }}>
        <View
          style={{
            flex: 0.2,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#424242",
            borderTopEndRadius: 8,
            borderTopStartRadius: 8
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.parentFlatList.addAct(this.props.index);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ marginLeft: 10, color: "white" }}>
                {this.props.data.name}
              </Text>
              <Text style={{ marginLeft: 10, color: "white" }}>
                {this.props.data.payed}
              </Text>
            </View>
          </TouchableOpacity>
          <Icon
            name="close"
            type="EvilIcons"
            style={{ color: "#C11B0F" }}
            onPress={() =>
              this.props.parentFlatList.deleteRowFromList(this.props.index)
            }
          />
        </View>
        <View
          style={{
            flex: 0.8,
            backgroundColor: "#E0E0E0",
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8
          }}
        >
          <FlatList
            style={{ marginLeft: 4, marginTop: 4 }}
            data={this.props.data.acts}
            horizontal={false}
            numColumns={3}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    alignItems: "baseline",
                    justifyContent: "center",
                    margin: 1,
                    height: 32
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.props.parentFlatList.removeAct(
                        this.props.index,
                        index
                      );
                    }}
                  >
                    <Price
                      price={item.price}
                      act={item.act}
                      bgColor={item.isShared ? "#b2ff59" : "#63E091"}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item, index) => JSON.stringify(index)}
            extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

module.exports = ActBox;

const styles = StyleSheet.create({
  layoutContainer: {
    backgroundColor: "#1652f4",
    height: 70
  }
});
