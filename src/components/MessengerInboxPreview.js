import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '../style/styles';


export const messengerInboxItem = (props) => {
    // Get Avatar
    // Get Title of the group/messenger
    // Get a timeStamp
    // Get the message preview
    return (
      <TouchableOpacity style={styles.messengerInboxContainer}>
        <View style={styles.messengerAvatarContainer} />
        <View style={styles.messengerPreviewContainer} />
      </TouchableOpacity>
    );
  }