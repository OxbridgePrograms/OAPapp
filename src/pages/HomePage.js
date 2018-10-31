
import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';

import { connect } from 'react-redux';

import Expo from 'expo';

// Custom components
import TopBanner, {TopBannerUser} from '../components/TopBanner';
import {centerDate} from '../functions/DateFunctions';
import {userLogout} from '../functions/DbFunctions';
import DisplayEvents from '../components/DisplayEvents';
import Announcements from '../components/Announcements';
import styles from '../style/styles';

//Function to feed HomePage with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData};
}

class HomePage extends Component {

  state = {isLoading: true,
    isLoadingAnnouncements: true,
    };

  constructor (props) {
    super(props);
    this.state.isLoadingEvents = false;
  }

  componentDidMount() {
    // Check if the user is logged in, if not go to loginpage
    // let localNotif = {
    //   title: 'Hello World',
    //   android: {
    //     vibrate: true,
    //     sound: true,
    //     color: '#111111',
    //     priority: 'high'
    //   },
    //   body: 'This is a local notification',
    //   ios: {
    //     sound: true
    //   }
    // };
    // console.log(localNotif);

    // let schedOption = {
    //   time: (new Date()).getTime() + 5000
    // };

    // Expo.Notifications.scheduleLocalNotificationAsync( localNotif, schedOption );
  }

  render() {
    let focusedDate = centerDate( this.props.program.programDates );
    return (
      <ScrollView style={styles.scroll} bounces={false}>
        <TopBanner programName={this.props.program.metaData.name} programYear={this.props.program.metaData.year} focusedDate={focusedDate}/>
        <Announcements type='recent'/>
        <DisplayEvents focusedDate={focusedDate} type={'upcoming'}/>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonWrapper} onPress={() => userLogout()}>
            <Text style={styles.buttonText} > Log out </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(HomePage);