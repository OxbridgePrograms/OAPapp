// app/routes/Authentication.js

import React, {Component} from 'react';
import {Alert,
  AsyncStorage,
  Text, 
  TextInput, 
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ImageBackground,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles from '../style/styles';
import {userLogin} from '../functions/DbFunctions';

import * as firebase from 'firebase';

class Authentication extends Component {

  constructor() {
    super()
    this.state = { username: null, 
      password: null };
  }

  componentDidMount() {
    // Check if the user is logged in, if not go to authentication
    var user = firebase.auth().currentUser;
    if (user) {
      Actions.Splashpage();
    }
  }

  _userLogin() {
    if (this.state.username != undefined && this.state.password != undefined) {
      userLogin(this.state.username, this.state.password);
    } else {
      Alert.alert('Cannot leave username/password empty');
    }
  }

  render() {
    return (
      
      <ImageBackground source={require('../../assets/bg.jpg')} style={styles.backgroundImage}>
         <KeyboardAvoidingView style={styles.backgroundImageFilter} behavior='padding' enabled>
          <View style={styles.container}>
            <Image source={require('../../assets/logo_inv.png')} style={styles.loginLogo}/>

            <View style={styles.form}>
              <TextInput
                editable={true}
                onChangeText={(username) => this.setState({username})}
                placeholder='Username'
                ref='username'
                returnKeyType='next'
                style={styles.inputText}
                value={this.state.username}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='white'
                selectionColor='white'
              />

              <TextInput
                editable={true}
                onChangeText={(password) => this.setState({password})}
                placeholder='Password'
                ref='password'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                style={styles.inputText}
                value={this.state.password}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor='white'
                selectionColor='white'
              />

              <TouchableOpacity style={styles.buttonWrapper} onPress={this._userLogin.bind(this)}>
                <Text style={styles.buttonText}> Log In </Text>
              </TouchableOpacity>
            </View>
          </View>
        
        </KeyboardAvoidingView>
      </ImageBackground>
      
    );
  }
}

export default Authentication;