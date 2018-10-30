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

// Custom components
import styles from '../style/styles';
import Announcements from '../components/Announcements';

//Function to feed AnnouncementDisplay with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData};
}

class AnnouncementDisplay extends Component {

  state = {isLoading: true};
  constructor (props) {
    super(props);
    this.state.isLoadingEvents = false;
  }

  componentDidMount() {
    // Check if the user is logged in, if not go to loginpage
    var user = firebase.auth().currentUser;
    if (user) {
    } else {
      Actions.Authentication();
    }
  }
// <Announcements />
  render() {
    return (
      <ScrollView style={styles.scroll} bounces={false}>
          <Announcements />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(AnnouncementDisplay);