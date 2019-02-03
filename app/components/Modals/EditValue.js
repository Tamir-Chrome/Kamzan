import React, { Component } from 'react';
import {
  View, Text, Modal, TouchableOpacity, Platform, TextInput, StyleSheet,
} from 'react-native';

export default class EditValuePrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      name: '',
      modalVisible: false,
      actName: '',
      indexOfAct: '',
    };
  }

  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  componentWillUnmount() {
    const { onRef } = this.props;
    onRef(this);
  }

  onSubmit() {
    const { parentScreen } = this.props;
    const { price, name, indexOfAct } = this.state;
    this.setModalVisible(false);
    parentScreen.submitInput(name, price, indexOfAct);
  }

  setModalVisible(visible, actName, indexOfAct) {
    this.setState({ modalVisible: visible, actName, indexOfAct });
  }

  render() {
    const { modalVisible, actName } = this.state;
    const {
      textProps = null,
      modalStyleProps = {},
      dialogStyleProps = {},
      cancelText = 'Cancel',
      submitText = 'Submit',
      message,
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          this.setModalVisible(false);
        }}
      >
        <View style={[styles.container, { ...modalStyleProps }]}>
          <View style={[styles.modal_container, { ...dialogStyleProps }]}>
            <View style={styles.modal_body}>
              <Text style={styles.title_modal}>
                {actName}
              </Text>
              <Text style={[message ? styles.message_modal : { height: 0 }]}>
                {message}
              </Text>
              <TextInput
                style={styles.input_container}
                autoCorrect={!(textProps && textProps.autoCorrect === false)}
                autoCapitalize={
                  textProps && textProps.autoCapitalize ? textProps.autoCapitalize : 'none'
                }
                clearButtonMode={
                  textProps && textProps.clearButtonMode ? textProps.clearButtonMode : 'never'
                }
                clearTextOnFocus={
                  textProps && textProps.clearTextOnFocus === true
                    ? textProps.clearTextOnFocus
                    : false
                }
                keyboardType={
                  textProps && textProps.keyboardType ? textProps.keyboardType : 'default'
                }
                underlineColorAndroid="transparent"
                placeholder="price"
                onChangeText={text => this.setState({ price: text })}
              />
              <TextInput
                style={styles.input_container}
                autoCorrect={!(textProps && textProps.autoCorrect === false)}
                autoCapitalize={
                  textProps && textProps.autoCapitalize ? textProps.autoCapitalize : 'none'
                }
                clearButtonMode={
                  textProps && textProps.clearButtonMode ? textProps.clearButtonMode : 'never'
                }
                clearTextOnFocus={
                  textProps && textProps.clearTextOnFocus === true
                    ? textProps.clearTextOnFocus
                    : false
                }
                keyboardType={
                  textProps && textProps.keyboardType ? textProps.keyboardType : 'default'
                }
                underlineColorAndroid="transparent"
                placeholder="act"
                onChangeText={text => this.setState({ name: text })}
              />
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={() => {
                  this.setModalVisible(false);
                }}
              >
                <Text style={styles.btn_modal_left}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
              <View style={styles.divider_btn} />
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={() => {
                  this.onSubmit();
                }}
              >
                <Text style={styles.btn_modal_right}>
                  {submitText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

module.exports = EditValuePrompt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        backgroundColor: 'rgba(0,0,0,0.62)',
      },
    }),
  },
  modal_container: {
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(220,220,220, 0.6)',
        borderRadius: 10,
        minWidth: 300,
      },
      android: {
        backgroundColor: '#fff',
        elevation: 24,
        minWidth: 280,
        borderRadius: 2,
      },
    }),
  },
  modal_body: {
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  title_modal: {
    fontWeight: 'bold',
    fontSize: 20,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 5,
      },
      android: {
        textAlign: 'left',
      },
    }),
  },
  message_modal: {
    fontSize: 16,
    ...Platform.select({
      ios: {
        textAlign: 'center',
        marginBottom: 10,
      },
      android: {
        textAlign: 'left',
        marginTop: 20,
      },
    }),
  },
  input_container: {
    textAlign: 'left',
    fontSize: 16,
    color: 'rgba(0,0,0,0.54)',
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        paddingBottom: 5,
        paddingLeft: 10,
        marginBottom: 15,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: '#009688',
      },
    }),
  },
  btn_container: {
    flex: 1,
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: '#B0B0B0',
        maxHeight: 48,
      },
      android: {
        alignSelf: 'flex-end',
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 1,
      },
    }),
  },
  divider_btn: {
    ...Platform.select({
      ios: {
        width: 1,
        backgroundColor: '#B0B0B0',
      },
      android: {
        width: 0,
      },
    }),
  },
  touch_modal: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      },
    }),
  },
  btn_modal_left: {
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize: 18,
        color: '#2699FF',
        textAlign: 'center',
        borderRightWidth: 5,
        borderColor: '#B0B0B0',
        padding: 10,
        height: 48,
        maxHeight: 48,
      },
      android: {
        textAlign: 'center',
        color: '#009688',
        padding: 8,
        width: 80,
      },
    }),
  },
  btn_modal_right: {
    fontWeight: 'bold',
    ...Platform.select({
      ios: {
        fontSize: 18,
        color: '#2699FF',
        textAlign: 'center',
        padding: 10,
      },
      android: {
        textAlign: 'center',
        color: '#009688',
        padding: 8,
        width: 80,
      },
    }),
  },
});
