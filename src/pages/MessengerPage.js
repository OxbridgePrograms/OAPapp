
import React, {Component} from 'react';
import {Alert, 
  Image, 
  KeyboardAvoidingView, 
  TouchableOpacity, 
  ScrollView,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';

import { connect } from 'react-redux';
import { sendMessage } from './../functions/ChatFunctions';

import Expo from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';

// Custom components
import styles from '../style/styles';

//Function to feed HomePage with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData,
    channelArr: state.channelArr};
}

// TODO: replace the messages w/ the messages fed by the prop
class MessengerPage extends Component {
  constructor (props) {
    super(props);
  }

  render() {

    return (
      <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      style={{flex: 1}}
      behavior="padding"
      >
        <GiftedChat
          messages={this.props.channelArr['ex1'].messages}
          onSend={messages => sendMessage(this.props.userData, 'ex1', messages)}
          user={{
            _id: this.props.userData.uid,
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps)(MessengerPage);