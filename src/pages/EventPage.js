import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  View} from 'react-native';
// import {BlurView} from 'expo';
import {Actions} from 'react-native-router-flux';
import {
  date2String
} from './../functions/DateFunctions';

import { connect } from 'react-redux';

import Modal from 'react-native-modalbox';
import SignUpComponent from './../components/SignUpComponent';

// Custom components
import styles, {lightBoxWidth, weekLabels} from '../style/styles';

//Function to feed Homepage with data as props
const mapStateToProps = (state) => {
  return {programId: state.program.metaData.id,
    programYear: state.program.metaData.year,
    userData: state.userData};
}

class EventPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      swipeToClose: true
    };

  }

  componentDidMount() {
    this.refs.modalEvent.open();
  }

  onClose() {
    Actions.pop(); 
  } 

  render() {
    let imgComponent = [];
    let startDateStr = date2String(this.props.event.startTime);
    let endDateStr = date2String(this.props.event.endTime);

    if (this.props.event.image) {
      imgComponent = [<Image style={styles.eventImage} source={{uri: this.props.event.image }} />];
    }

    return (
        <View style={styles.blurContainer}>
          <Modal style={styles.eventContainer} 
            position={"center"}
            onClosed={this.onClose}
            ref={"modalEvent"} 
            swipeToClose={this.state.swipeToClose}>
            <ScrollView style={styles.scroll}>
              {imgComponent}
              <View style={styles.eventContentContainer}>
                <Text style={styles.eventTitle}>{this.props.event.title}</Text>
                <Text style={styles.eventLocation}>{this.props.event.location}</Text>
                <Text style={styles.eventDescription}>{this.props.event.description} </Text>
                <Text style={styles.eventTime}>{startDateStr.date} | {startDateStr.time} - {endDateStr.time} </Text>
                <SignUpComponent  userEvents={this.props.userData.events} eid={this.props.event.uid} uid={this.props.userData.uid} type={'large'}/>
              </View>
            </ScrollView>
          </Modal>
        </View>
      );
  }
}

export default connect(mapStateToProps)(EventPage);