
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

import Expo from 'expo';
import { GiftedChat } from 'react-native-gifted-chat';

// Custom components
import styles from '../style/styles';
import { sendMessage,
markAsRead } from './../functions/ChatFunctions';

// Messenger only needs channel and user data
const mapStateToProps = (state) => {
  return {userData: state.userData,
    channelArr: state.channelArr};
}

// TODO: replace the messages w/ the messages fed by the prop
class MessengerPage extends Component {
  constructor (props) {
    super(props);
    this._markChannelAsRead()
  }

  // mark as read for each time the page refreshes
  componentDidUpdate () {
    this._markChannelAsRead() 
  }

  _markChannelAsRead() {
    if (!this.props.channelArr[ this.props.channelId ].users[ this.props.userData.uid ].read )
      markAsRead(this.props.userData.uid, this.props.channelId);
  }

  render() {

    return (
      <KeyboardAvoidingView
      keyboardVerticalOffset={78}
      style={{flex: 1}}
      behavior="padding"
      >
        <GiftedChat
          messages={this.props.channelArr[ this.props.channelId ].messages}
          onSend={messages => sendMessage(this.props.userData, this.props.channelId, messages)}
          user={{
            _id: this.props.userData.uid,
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps)(MessengerPage);