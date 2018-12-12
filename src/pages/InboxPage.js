
import React, {Component} from 'react';
import {Alert, 
  Image, 
  KeyboardAvoidingView, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  Text,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';

import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

// Custom components
import styles from '../style/styles';
import {generateAvatar,
  generateTitle,
  generateChatPreview,
  generateTimeStamp,
compareChannels} from './../functions/ChatFunctions';

//Function to feed HomePage with data as props
const mapStateToProps = (state) => {
  return {userList: state.userList,
    userData: state.userData,
    channelArr: state.channelArr};
}

// TODO: replace the messages w/ the messages fed by the prop
class MessengerPage extends Component {

  constructor (props) {
    super(props);
  }

  gotoMessenger = (channelId, channelTitle) => {
    Actions.push('Messenger', {
      channelId: channelId,
      title: channelTitle
    });
  }

  // Renders an individual inbox item
  renderInboxPreview = ({item}) => {

    // Get Avatar of the chat (usually the other user's avatar)
    let chatAvatarComponent = generateAvatar(this.props.userList,
      item.users,
      this.props.userData.uid);

    // Get Title of the group/messenger X
    let chatTitle = generateTitle(this.props.userList,
      item.users,
      this.props.userData.uid);

    // Get the message preview and timestamp
    let chatMessage = generateChatPreview(item.messages,
      this.props.userData.uid);
    let timeStamp = chatMessage.timeStamp;
    chatMessage = chatMessage.message;

    // If the message is unread
    let readComponents = {
      styleTitle: styles.inboxTitleUnread,
      styleText: styles.inboxDescriptionUnread,
      bubble: (<FontAwesome size={14} name="circle" color="#028bff" style={styles.notificationIcon}/>)
    };
    if (item.users[this.props.userData.uid].read) {
      readComponents.styleTitle = styles.inboxTitle;
      readComponents.styleText = styles.inboxDescription;
      readComponents.bubble = [];
    }

    // Return the preview
    return (
      <TouchableOpacity 
        style={styles.messengerInboxContainer}
        onPress={() => this.gotoMessenger(item.uid, chatTitle)}>

        <View style={styles.messengerAvatarContainer}>
          {chatAvatarComponent}
        </View>
        <View style={styles.messengerPreviewContainer} >
          <Text
            style={readComponents.styleTitle}>
            {chatTitle}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <View style={{flex:1}}>
              <Text numberOfLines={1} 
                ellipsizeMode={'tail'} 
                style={readComponents.styleText}>
                  {chatMessage}
              </Text>
            </View>
            <Text style={readComponents.styleText}>
                {timeStamp}
            </Text>
          </View>
        </View>
        {readComponents.bubble}
      </TouchableOpacity>
      );
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
          <FlatList 
                  data={ Object.values(this.props.channelArr).sort( compareChannels ) }
                  ref={(ref) => {this._flatRefInbox = ref}}
                  renderItem={this.renderInboxPreview} 
                  initialNumToRender={14}
                  keyExtractor={(item, index) => index.toString()}
                />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(MessengerPage);