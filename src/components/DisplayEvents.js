import React, { Component } from 'react';
 
import { Alert,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom components
import styles, {monthLabels} from '../style/styles';
import {
  date2String,
  sortByTime,
  getDayRange,
  filterByRange,
  idNotInArray,
  generateDates, 
  DayOfWeek
} from './../functions/DateFunctions';
import SignUpComponent from './SignUpComponent';

import * as firebase from 'firebase';
import { connect } from 'react-redux';
import {throttle} from 'lodash';

const numEvents = 3;
const numLines = 2;

/* This function is used to filter out events used for the upcoming events page */
const UpcomingEventsList = (events, eventIds, focusedDate, endDate) => {
  let upcomingEvents = [];
  upcomingEvents = filterByRange(events, eventIds, focusedDate, endDate).slice(0, numEvents);
  return upcomingEvents;
}

/* This function is used to fetch user subscribed events that are upcoming 
TODO: IF THERE IS NO SUCH EVENT IN THE MASTER LIST, DELETE IT*/
const UserEventsList = (events, userEvents) => {
  if (userEvents == undefined)
    return [];

  let filteredEvents = Object.values(userEvents).map( (data) => {
    return {startTime: events[data.uid].startTime, endTime: events[data.uid].endTime, uid: data.uid};
  });
  return sortByTime(filteredEvents);
}

/* This is called to open up the event page */
const gotoEvent = (dateLabel, event, date) => {
  Actions.EventPage({
    title: dateLabel,
    event: event,
    date: date
  });
}

//State tracker for DisplayEvents
const mapStateToProps = (state) => {
  return {userData: state.userData,
    program: state.program};
}

class DisplayEvents extends Component {

  state = {};

  constructor (props) {
    super(props);
  }

  EventBubble = (props) => {
  const event_info = this.props.program.events[props.event.uid];
  let dateStr = date2String(event_info.startTime);
  let dateStrEnd = date2String(event_info.endTime);

  return (
    <TouchableOpacity onPress={() => gotoEvent(dateStr.date, event_info, dateStr)}>
      <View style={styles.bubbleContainer}>
      
        <View style={{flex: 1}}>
          <Text style={styles.eventTitle}>{event_info.title}</Text>
          <Text style={styles.eventLocation}>{event_info.location} </Text>
          <Text numberOfLines={numLines} ellipsizeMode={'tail'} style={styles.eventDescription}>{event_info.description} </Text>
          <Text style={styles.eventTime}>{dateStr.date} | {dateStr.time} - {dateStrEnd.time} </Text>
        </View>
          <SignUpComponent  userEvents={this.props.userData.events} eid={event_info.uid} uid={this.props.userData.uid} type={'small'}/>
      </View>
    </TouchableOpacity>
    );
  }

  // This is the general function used to display the event bubbles
  EventList = (props) => {
      var eventArr = [];
      if(props.events !== undefined && props.events.length > 0){
        eventArr = props.events.map((event) => (
          <this.EventBubble event={event} />));
      }

      // Case if there are no events
      if(eventArr.length == 0)
        eventArr = [<Text style={styles.noEventText}>No Events</Text>];
      return eventArr;
  }

  render() {
    var content = [];

    if (this.props.type == 'upcoming') {
      content[0] = 'Upcoming Events';
      content[1] = UpcomingEventsList(this.props.program.events, 
        this.props.program.eventIdSorted, 
        this.props.focusedDate, 
        this.props.program.programDates.endDate);
        
      return (
        <View style={styles.eventsContainer}>
          <TouchableOpacity onPress={() => Actions.CalendarPage()}>
            <View style={styles.eventsHeaderContainer}>
              <Text style={styles.subTitle}>{content[0]}</Text>
              <MaterialCommunityIcons size={30} name="chevron-right" color={'#fff'} />
            </View>
          </TouchableOpacity>
          <this.EventList events={content[1]} />
        </View>
      );
    } else if (this.props.type == 'date') {
      let dateRange = getDayRange(this.props.focusedDate);
      content[0] = date2String(this.props.focusedDate).date;
      content[1] = filterByRange(this.props.program.events, 
        this.props.program.eventIdSorted, 
        dateRange.startTime, 
        dateRange.endTime);

      return (
        <View style={styles.eventsContainer}>
          <View style={styles.eventsHeaderContainer}>
            <Text style={styles.subTitle}>{content[0]}</Text>
          </View>
          <this.EventList events={content[1]}/>
        </View>
      );
    } else if (this.props.type == 'user') {
      content[0] = "What's Next\?";
      content[1] = UpcomingEventsList( this.props.program.events, 
        UserEventsList(this.props.program.events, 
          this.props.userData.events), 
        this.props.focusedDate, 
        this.props.programDates.endDate);

      return (
        <View style={styles.eventsContainer}>
          <View style={styles.eventsHeaderContainer}>
            <Text style={styles.subTitle}>{content[0]}</Text>
          </View>
          <this.EventList events={content[1]}/>
        </View>
      );
    } else {
      return (
        <View style={styles.eventsContainer}>
          <View style={styles.eventsHeaderContainer}>
            <Text style={styles.subTitle}>Invalid Type</Text>
            {seeMore}
          </View>
        </View>
      );
    }
  }
}

export default connect(mapStateToProps)(DisplayEvents);