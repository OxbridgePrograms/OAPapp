import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  View,
  ImageBackground,
  ActivityIndicator} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';

import styles from '../style/styles';

import ActionList from './../redux/actions/ActionList';
import {store} from './../index';
import { connect } from 'react-redux';

import {sortByTime} from './../components/DisplayEvents';
import {userLogout,
  getUserProfile,
  getUserMasterList,
  getProgramData,
  detachAllFirebaseListeners} from './../functions/DbFunctions';

// import {registerForPushNotificationsAsync} from './../functions/TokenFunctions';

//Keep track of redux storage 
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData,
    userList: state.userList};
}

class Splashpage extends Component {
  state = {};

  constructor(props) {
    super (props);
  }

  componentDidMount () {
    let user = firebase.auth().currentUser;
    getUserProfile(user.uid);
    // registerForPushNotificationsAsync(user.uid);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

      // update the information if they are not in the redux storage
      if (this.props.userData != undefined &&
        this.props.userList === undefined &&
        this.props.program === undefined) {
        detachAllFirebaseListeners();
        getUserMasterList();
        getProgramData();
        getMessageData();
      } else if (this.props.userData != undefined &&
        this.props.userList != undefined &&
        this.props.program != undefined) {

        // Update info if there is a mismatch:
        if (this.props.program.metaData.id != this.props.userData.programId ||
          this.props.program.metaData.year != this.props.userData.programYear) {
          detachAllFirebaseListeners();
          getUserMasterList();
          getProgramData();
          getMessageData();
        } else
          this._gotoHomepage();
      }
  }

  // Save the data in storage and goto the homepage
  // We pop this page so we cannot navigate back to it
  _gotoHomepage() {
    Actions.pop();
    Actions.drawerMenu();
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/bg.jpg')} style={styles.backgroundImage}>
        <View style={styles.backgroundImageFilter}>
          <View style={styles.container}>
            <Image source={require('../../assets/logo_inv.png')} style={styles.loginLogo}/>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      </ImageBackground>
      );
  }
}

export default connect(mapStateToProps)(Splashpage);