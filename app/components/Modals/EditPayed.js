import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  TextInput,
  StyleSheet,
  CheckBox,
} from 'react-native';

export default class EditPayedPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      sign: 1,
      personIndex: '',
      modalVisible: false,
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
    const { value, sign, personIndex } = this.state;
    this.setModalVisible(false);
    parentScreen.submitInput(value, sign, personIndex);
  }

  setModalVisible(visible, personIndex = '', personName = '') {
    this.setState({
      modalVisible: visible,
      personIndex,
      personName,
      sign: 1,
    });
  }

  render() {
    const { modalVisible, personName, sign } = this.state;
    const {
      textProps = null,
      modalStyleProps = {},
      dialogStyleProps = {},
      cancelText = 'Cancel',
      submitText = 'Submit',
      message,
      title,
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
                {`${title} of ${personName}`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <CheckBox
                  value={sign === 1}
                  onValueChange={() => {
                    this.setState({ sign: sign === 1 ? -1 : 1 });
                  }}
                />
                <Text>
                  {'Add'}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
              >
                <CheckBox
                  value={sign === -1}
                  onValueChange={() => {
                    this.setState({ sign: sign === 1 ? -1 : 1 });
                  }}
                />
                <Text>
                  {'Remove'}
                </Text>
              </View>
              <TextInput
                style={styles.input_container}
                clearButtonMode={
                  textProps && textProps.clearButtonMode ? textProps.clearButtonMode : 'never'
                }
                clearTextOnFocus={
                  textProps && textProps.clearTextOnFocus === true
                    ? textProps.clearTextOnFocus
                    : false
                }
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                placeholder="amount to change"
                onChangeText={text => this.setState({ value: text })}
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
        textAlign: 'right',
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
        textAlign: 'right',
        color: '#009688',
        padding: 8,
        width: 80,
      },
    }),
  },
});
