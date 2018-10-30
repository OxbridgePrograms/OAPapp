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

// Custom components
import TopBanner, {TopBannerUser} from '../components/TopBanner';
import {centerDate} from '../functions/DateFunctions';
import DisplayEvents from '../components/DisplayEvents';
import styles from '../style/styles';
import {userLogout} from '../functions/DbFunctions';

//Function to feed Homepage with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData};
}

class Homepage extends Component {

  state = {};

  constructor (props) {
    super(props);
    this.state.focusedDate = centerDate( this.props.program.programDates );
    this.state.imageURL = this.props.userData.image;
  }

  componentDidMount() {
    // Check if the user is logged in, if not go to loginpage
    var user = firebase.auth().currentUser;
    if (user) {
    } else {
      userLogout();
    }
  }

  render() {
    content = ['N/A', 'N/A', {'dorm':'TBD', 'room':'', 'staircase': ''}]
    if (this.props.userData.courses != undefined) {
      if (this.props.userData.courses.major != undefined)
        content[0] = this.props.userData.courses.major;
      if (this.props.userData.courses.minor != undefined)
        content[1] = this.props.userData.courses.minor;
    }
    if (this.props.userData.housing != undefined) {
      if (this.props.userData.housing.dorm != undefined)
        content[2].dorm = this.props.userData.housing.dorm + '\n';
      if (this.props.userData.housing.room != undefined)
        content[2].room = 'Room ' + this.props.userData.housing.room;
      if (this.props.userData.housing.staircase != undefined)
        content[2].staircase = 'Staircase ' + this.props.userData.housing.staircase + '\n';
    }

  
      return (
        <ScrollView style={styles.scroll}>
          <TopBannerUser userData={this.props.userData} profileURL={this.state.imageURL}/>

            <View style={styles.eventsContainer}>
              <View style={styles.bubbleContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.eventTitle}>Major</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.eventDescription}>{content[0]}</Text>
                </View>
              </View>

              <View style={styles.bubbleContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.eventTitle}>Minor</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.eventDescription}>{content[1]}</Text>
                </View>
              </View>

              <View style={styles.bubbleContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.eventTitle}>Housing</Text>
                </View>
                <View style={{flex: 2}}>
                  <Text style={styles.eventDescription}>{content[2].dorm}{content[2].staircase}{content[2].room}</Text>
                </View>
              </View>
            </View>

          <DisplayEvents events={this.props.program.events} focusedDate={this.state.focusedDate} programDates={this.props.program.programDates} userData={this.props.userData} type={'user'}/>
          <View style={styles.container}>
            <TouchableOpacity style={styles.buttonWrapper} onPress={() => userLogout()}>
              <Text style={styles.buttonText} > Log out </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
      );
  }
}

export default connect(mapStateToProps)(Homepage);