import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import {Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Custom components
import styles, {monthLabels, weekLabels} from '../style/styles';

//Function to feed Homepage with data as props
const mapStateToProps = (state) => {
  return {programId: state.userData.programId,
    userList: state.userList};
}

class AnnouncementPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      swipeToClose: true
    };
  }

  componentDidMount() {
    this.refs.modalAnnouncement.open();
  }

  onClose() {
    Actions.pop(); 
  } 

  render() {

    // Get user profile picture if available
    let imageBubble = (<Ionicons size={50} name="md-person" color={'#EBEBEB'} />);
    if ( this.props.userList[this.props.announcement.userId].image ){
      imageBubble = (<Image source={{uri : this.props.userList[this.props.announcement.userId].image}} style={styles.announcementUserProfile}/>);
    }

      return (
        <View style={styles.blurContainer}>
          <Modal style={styles.eventContainer} 
            position={"center"}
            onClosed={this.onClose}
            ref={"modalAnnouncement"} 
            swipeToClose={this.state.swipeToClose}>
            <ScrollView style={styles.scroll}>
              <View style={styles.eventContentContainer}>
                <Text style={styles.eventTitle}>{this.props.announcement.title}</Text>
                <Text style={styles.eventDescription}>{this.props.announcement.description}</Text>
                <View style={styles.bubbleContainer}>
                  <View style={styles.announcementIconContainer}>
                    {imageBubble}
                  </View>
                  <View style={styles.announcementBodyContainer}>
                    <Text style={styles.eventTime}>{this.props.announcement.userName}{'\n'}{this.props.dateLabel}</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      );
  }
}

export default connect(mapStateToProps)(AnnouncementPage);