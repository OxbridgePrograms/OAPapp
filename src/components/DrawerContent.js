import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Button,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../style/styles';

class DrawerContent extends React.Component {

  navigateToPage = (page) => {

        if (page == 'Home')
          Actions.HomePage();
        else if (page == 'Schedule')
          Actions.CalendarPage();
        else if (page == 'Profile')
          Actions.Settings();
        else if (page == 'Announcements')
          Actions.Announcements();
        // else if (page == 'Map')
        //   Actions.Map();
    }

  createMenuItem = (props) => {
    return (
            <TouchableOpacity 
            style={styles.bubbleContainer}
            onPress={() => this.navigateToPage(props.page)}>
              <View style={styles.drawerIconContainer}>
                <Ionicons size={25} name={props.icon} color={'#fff'} />
              </View>
              <View style={styles.announcementBodyContainer}>
                <Text style={styles.drawerItemText}>{props.title}</Text>
              </View>
              <MaterialCommunityIcons size={25} name="chevron-right" color={'#fff'} />
            </TouchableOpacity>
        );
  }

  render() {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.containerTopLeftColumn}>
          <this.createMenuItem title="Home" page="Home" icon="md-home" />
          <this.createMenuItem title="Announcements" page="Announcements" icon="md-megaphone" />
          <this.createMenuItem title="Program Schedule" page="Schedule" icon="md-calendar" />
          <this.createMenuItem title="Campus Map" page="Map" icon="md-map" />
          <this.createMenuItem title="Profile" page="Profile" icon="md-person" />
        </View>

      </View>
    );
  }
}

export default DrawerContent;
