// React/Expo Components
import React, {Component} from 'react';
import {ActivityIndicator,
  Alert,
  View,
  ImageBackground,
  Image} from 'react-native';
import {Router, Scene, Tabs, Drawer, Lightbox} from 'react-native-router-flux';
import Expo, {Font} from 'expo';

// Redux state management
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';

// Database
import * as firebase from 'firebase';

import { Ionicons } from '@expo/vector-icons';

//Pages and stylings
import Authentication from './pages/Authentication';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import Settings from './pages/Settings';
import Splashpage from './pages/Splashpage';
import EventPage from './pages/EventPage';
import AnnouncementPage from './pages/AnnouncementPage';
import InboxPage from './pages/InboxPage';
import MessengerPage from './pages/MessengerPage';
import AnnouncementDisplay from './pages/AnnouncementDisplay';

import styles from './style/styles';
import DrawerContent from './components/DrawerContent';
import FeedbackComponent from './components/FeedbackComponent';

export const store = configureStore();

class App extends Component {

  state = {fontLoaded: false}
  async componentDidMount() {
    await Font.loadAsync({
      'Montserrat-Regular': require('./../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
      'Montserrat-Light': require('./../assets/fonts/Montserrat/Montserrat-Light.ttf'),
      'Muli-Regular': require('./../assets/fonts/Muli/Muli-Regular.ttf'),
      'Muli-Light': require('./../assets/fonts/Muli/Muli-Light.ttf'),
      'San-Francisco-Regular': require('./../assets/fonts/SanFrancisco/San-Francisco-Regular.ttf'),
      'San-Francisco-Bold': require('./../assets/fonts/SanFrancisco/San-Francisco-Bold.ttf'),
      'San-Francisco-Light': require('./../assets/fonts/SanFrancisco/San-Francisco-Light.ttf'),
      'Roboto-Regular': require('./../assets/fonts/Roboto/Roboto-Regular.ttf'),
      'Roboto-Bold': require('./../assets/fonts/Roboto/Roboto-Bold.ttf'),
      'Roboto-Light': require('./../assets/fonts/Roboto/Roboto-Light.ttf')
    });
    this.setState({fontLoaded: true});
  }

  render() {
    if (this.state.fontLoaded){
      return(
        <Provider store={store}>
          <Router>
            <Lightbox>
              <Scene 
                key='root'>
                <Scene
                  component={Authentication}
                  hideNavBar={true}
                  initial={true}
                  key='Authentication'
                  title='Authentication'
                />
                <Scene
                  component={Splashpage}
                  hideNavBar={true}
                  key='Splashpage'
                  title='Splashpage'
                />

                <Drawer
                  hideNavBar
                  navTransparent={true}
                  drawerIcon={<Ionicons size={30} name="md-menu" color={'#EBEBEB'} />}
                  contentComponent={DrawerContent}
                  key="drawerMenu">
                  <Scene
                    component={HomePage}
                    navTransparent={true}
                    key='HomePage'
                  />
                  <Scene
                    component={AnnouncementDisplay}
                    navigationBarStyle={styles.navBar}
                    titleStyle={styles.navBarTitle}
                    title='Announcements'
                    key='Announcements'
                  />
                  <Scene
                    component={InboxPage}
                    title='Chat'
                    navigationBarStyle={styles.navBar}
                    titleStyle={styles.navBarTitle}
                    navBarButtonColor='white'
                    key='Chat'
                  />
                  <Scene
                    component={CalendarPage}
                    navTransparent={true}
                    key='CalendarPage'
                  />
                  <Scene
                    component={Settings}
                    navTransparent={true}
                    key='Settings'
                  />
                </Drawer>
                <Scene
                    component={MessengerPage}
                    title='Default_Messenger_Header'
                    navigationBarStyle={styles.navBar}
                    titleStyle={styles.navBarTitle}
                    navBarButtonColor='white'
                    key='Messenger'
                />
              </Scene>

            {/* Lightbox components */}
              
              <Scene
                  component={EventPage}
                  hideNavBar={false}
                  key='EventPage'
                  title='Default_Event_Header'
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  navBarButtonColor='white'
                />
                <Scene
                  component={AnnouncementPage}
                  hideNavBar={false}
                  key='AnnouncementPage'
                  title='Default_Announcement_Header'
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  navBarButtonColor='white'
                />
                <Scene
                  component={FeedbackComponent}
                  hideNavBar={false}
                  key='FeedbackComponent'
                  title='Default_Feedback_Header'
                  navigationBarStyle={styles.navBar}
                  titleStyle={styles.navBarTitle}
                  navBarButtonColor='white'
                />
            </Lightbox>
          </Router>
        </Provider>
      );
    } else {
      return(
      <ImageBackground source={require('../assets/bg.jpg')} style={styles.backgroundImage}>
        <View style={styles.backgroundImageFilter}>
          <View style={styles.container}>
            <Image source={require('../assets/logo_inv.png')} style={styles.loginLogo}/>
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      </ImageBackground>
      );
    }
  }
}

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDcOiAf4K2ae4CezgpaIYSZkPek9nNcwZI",
    authDomain: "oapapp-578f6.firebaseapp.com",
    databaseURL: "https://oapapp-578f6.firebaseio.com",
    projectId: "oapapp-578f6",
    storageBucket: "oapapp-578f6.appspot.com",
    messagingSenderId: "843542046816"
};

firebase.initializeApp(firebaseConfig);
Expo.registerRootComponent(App);
export default App;