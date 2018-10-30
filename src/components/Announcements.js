// app/routes/Announcements.js

import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  date2String,
  sortByTime,
  getDayRange,
  filterByRange,
  idNotInArray,
  generateDates, 
  DayOfWeek,
  centerDate
} from './../functions/DateFunctions';

import * as firebase from 'firebase';

import { connect } from 'react-redux';

// Custom components
import DisplayEvents from './DisplayEvents';
import styles, {monthLabels} from '../style/styles';

//Function to feed Announcements with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData,
    userList: state.userList};
}

//Set the maximum number of announcments
const numAnnouncements = 1;
const numLines = 2;

/* This is called to open up the announcement page */
const gotoAnnouncement = (dateLabel, announcement) => {
  Actions.AnnouncementPage({
    dateLabel: dateLabel,
    announcement: announcement
  });
}

class Announcements extends Component {

  state = {};

  constructor (props) {
    super(props);
    this.state.focusedDate = centerDate( this.props.program.programDates );
    this.state.announcement = [];
    if (this.props.type == 'recent') {
      this.state.isTruncated = true;
      this.state.isReversed = true;
    }
    else {
      this.state.isTruncated = false;
      this.state.isReversed = false;
    }
  }

  componentDidMount() {
    this._fetchAnnouncements();
  }

  // Fetch the announcements in order
  _fetchAnnouncements = () => {
    let announcementStack = sortByTime( Object.values(this.props.program.announcements).map( (obj) => {
      return {uid: obj.uid, startTime: obj.time, endTime: obj.time};
    }) );

    // Reverse/truncate the list if necessary
    if (this.state.isReversed)
      announcementStack = announcementStack.reverse();
    if (this.state.isTruncated) 
      announcementStack = announcementStack.slice(0, numAnnouncements);


    // Retrieve the announcement information
    announcementStack = announcementStack.map( (obj) => {
      return this.props.program.announcements[obj.uid]
    });

    this.setState( (prevState) => {
      prevState.announcement = announcementStack;
      prevState.announcementURL = announcementStack.map( (a) => this.props.userList[a.userId].image);
      return prevState;
    });
  }

  AnnouncementBubble = (props) => {
    const announcement_info = props.announcement;
    let dateLabel = date2String(announcement_info.time);
    dateLabel = [dateLabel.month, dateLabel.day, '|', dateLabel.time].join(' ');

    var imageBubble = (<Ionicons size={50} name="md-person" color={'#EBEBEB'} />);
    if ( this.state.announcementURL[props.index] != undefined && this.state.announcementURL[props.index] ){
      imageBubble = (<Image source={{uri : this.state.announcementURL[props.index]}} style={styles.announcementUserProfile}/>);
    }
    return (
      <TouchableOpacity onPress={() => gotoAnnouncement(dateLabel, announcement_info)}>
        <View style={styles.bubbleContainer}>
          <View style={styles.announcementIconContainer}>
            {imageBubble}
          </View>
          <View style={styles.announcementBodyContainer}>
            <Text style={styles.eventTitle}>{announcement_info.title}</Text>
            <Text numberOfLines={numLines} ellipsizeMode={'tail'} style={styles.eventDescription}>{announcement_info.description}</Text>
            <Text style={styles.eventTime}>{announcement_info.userName}{'\n'}{dateLabel}</Text>
          </View>
        </View>
      </TouchableOpacity>
      );
  }

  ListAnnouncements = () => {
    var announcementArr = [];
    if(this.state.announcement != undefined || this.state.announcement.length != 0){
      announcementArr = this.state.announcement.map((announcement, index) => (
        <this.AnnouncementBubble announcement={announcement} index={index}/>));
    } else if(this.state.announcement.length == 0)
      eventArr = [<Text style={styles.noEventText}>No Announcements</Text>];
    return announcementArr;
  }

  //Render full (default), otherwise if props.type = 'recent' load numAnnouncements
  render() {
    if (this.props.type == 'recent') {
      return (
        <View style={styles.eventsContainer}>
          <TouchableOpacity onPress={() => Actions.Announcements()}>
            <View style={styles.eventsHeaderContainer}>
              <Text style={styles.subTitle}>Recent Announcements</Text>
              <MaterialCommunityIcons size={25} name="chevron-right" color={'#fff'} />
            </View>
          </TouchableOpacity>
          <this.ListAnnouncements/>
        </View>
      );
    } else {
      return (
        <View style={styles.eventsContainer}>
          <this.ListAnnouncements/>
        </View>
      );
    }
  }
}

export default connect(mapStateToProps)(Announcements);