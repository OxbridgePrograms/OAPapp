
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
import SearchBar from 'react-native-material-design-searchbar';

import * as firebase from 'firebase';

import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

// Custom components
import styles from '../style/styles';
import {generateAvatar,
  generateTitle,
  generateChatPreview,
  generateTimeStamp,
  compareChannels,
filterMessages} from './../functions/ChatFunctions';

//Function to feed HomePage with data as props
const mapStateToProps = (state) => {
  return {userList: state.userList,
    userData: state.userData,
    channelArr: state.channelArr};
}

// TODO: replace the messages w/ the messages fed by the prop
class MessengerPage extends Component {

  state = {};

  constructor (props) {
    super(props);
    this.state.channelList = this.props.channelArr;
    this.state.filterText = '';
  }

  // Update the list of users everytime the filterText changes
  componentDidUpdate(prevProps, prevState) {

    // Only update when filterText changes
    if (prevState.filterText != this.state.filterText ||
      this.props != prevProps) {
      let newList = filterMessages(this.props.channelArr,
        this.props.userData.uid,
        this.props.userList,
        this.state.filterText);
      this.setState( (prevState) => {
        prevState.channelList = newList;
        return prevState;
      });
    }
  }

  // pressing on the chat message will open up the chat page for the channel
  gotoMessenger = (channelId, channelTitle) => {
    Actions.push('Messenger', {
      channelId: channelId,
      title: channelTitle
    });
  }

  // Update the filtered Text
  filterList = (text) => {
    this.setState( Object.assign({}, this.state, {filterText : text}) );
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

  // Render the inbox with a flatlist/searchbar
  render() {
    return (
      <View style={styles.scroll}>
        <SearchBar
          onSearchChange={(text) => this.filterList(text)}
          height={40}
          onFocus={() => console.log('On Focus')}
          onBlur={() => console.log('On Blur')}
          placeholder={'Search'}
          autoCorrect={false}
          padding={15}
          inputStyle={styles.searchBar}
          textStyle={styles.searchBarText}
          returnKeyType={'search'}
        />
        <ScrollView style={styles.scroll}>
            <FlatList 
                    data={ Object.values(this.state.channelList).sort( compareChannels ) }
                    ref={(ref) => {this._flatRefInbox = ref}}
                    renderItem={this.renderInboxPreview} 
                    initialNumToRender={14}
                    keyExtractor={(item, index) => index.toString()}
                  />
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps)(MessengerPage);