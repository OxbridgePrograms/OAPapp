import React, { Component } from 'react';
 
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text
} from 'react-native';
import { Card } from 'react-native-elements';
import { LinearGradient } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import styles, {profilePictureWidth, monthLabels, weekLabels} from '../style/styles';
import {date2String} from './../functions/DateFunctions';

const TopBanner = (props) => {
  var str = String(props.programName).toUpperCase();
  let dateStr = date2String(props.focusedDate);

  /** Maybe include the weather eventually:
            <View style={styles.bannerDataContainer}>
                    <MaterialCommunityIcons style={{marginRight: 10}} size={20} name="weather-sunny" color={'#fff'} />
                    <Text style={styles.bannerSubText} >90˚F Sunny</Text>
                  </View>
  **/
      return(
      <View>
        <View style={styles.bannerContainer}>
          <ImageBackground source={require('../../assets/program/camTrad/bg.jpg')} style={styles.backgroundImage}>
          <LinearGradient
          colors={['rgba(9, 50, 102, 0.3)', 'rgba(9, 50, 102, 0.5)']}
          style={styles.containerBottomLeftColumn}>
              <View style={styles.bannerTextBox}>
                  <Text style={styles.bannerSubText} >{props.programYear}</Text>
                  <Text style={styles.bannerText} >{str}</Text>
              </View>
                  <View style={styles.bannerDataContainer}>
                    <Text style={styles.bannerDateContainer} >{dateStr.day}</Text>
                    <Text style={styles.bannerSubText} >{dateStr.month}, {dateStr.year} | {dateStr.dayOfWeek}</Text>
                  </View>
          </LinearGradient>
          </ImageBackground>
        </View>
      </View>
      );
}

export const TopBannerUser = (props) => {
  var info = [<Text style={styles.profileSubTitle}>{props.userData.title}</Text>];
  var profilePicture = [<Ionicons size={50} name="md-person" color={'#EBEBEB'} style={styles.profilePictureContainer}/>];
  if (props.profileURL != undefined) {
    profilePicture = [<Card
          containerStyle={styles.profilePictureContainer}
          imageStyle={styles.profilePicture}
          image={{ uri:props.profileURL }}
        />];
  }
    return (
      <View>
        <View style={styles.bannerContainer}>
          <ImageBackground source={require('../../assets/program/camTrad/bg_profile.jpg')} style={styles.backgroundImage}>
            <LinearGradient
            colors={['rgba(9, 50, 102, 0.6)', 'rgba(9, 50, 102, 0.7)']}
            style={styles.containerBottomCenterColumn}>
                  <Text style={styles.profileTitle} >{props.userData.firstName} {props.userData.lastName}</Text>
                  <Text style={styles.profileSubTitle} >{props.userData.title}</Text>
            </LinearGradient>
          </ImageBackground>
          {profilePicture}
        </View>
      </View>
    );
}

export default TopBanner;