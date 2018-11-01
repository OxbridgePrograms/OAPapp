
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
import styles from '../style/styles';

//Function to feed HomePage with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData,
    channelArr: state.channelArr};
}

class HomePage extends Component {

  state = {};

  constructor (props) {
    super(props);
  }

  componentDidMount() {
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