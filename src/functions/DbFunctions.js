import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';

import ActionList from './../redux/actions/ActionList';
import {store} from './../index';

/************************************************************************************************
*
* SplashPage functions (globally listens to incoming data / initializes data)
*
*************************************************************************************************/

// Global variables for the logout function
var unsubscribe = null;

  // Get the user data from the database. This function will listen to the database for any changes
  export const getUserProfile = (uid) => {
    let dBURLUser = 'users/' + uid

    const db = firebase.database();
    db.ref(dBURLUser).on('value', (snapshot) => {

      // Store the data into redux
      store.dispatch({type: ActionList.ADD_USER_DATA, userData: snapshot.val()});

      // store the listener address if it is not in the list already
      store.dispatch({type: ActionList.ADD_DB_LISTENER, dbURL: dBURLUser});

      // Update the message information (message information may have changed)
      getMessageData();

      console.log('User Firebase redux updated');

      }, (error) =>{

        // Return to login if there is a connection error
        Alert.alert('Connection Error', 'Problem downloading personal information, Please check your internet connection: ' + error.code);
        Actions.popTo('Authentication');
      });
  }


  // Get the list of users from the program. This function is read once. Requires userData to be defined
  export const getUserMasterList = () => {

    // Returns to the login page if userData is undefined (Should never happen)
    if (store.getState().userData == undefined) {
      Alert.alert('User data undefined', 'Please contact Oxbridge Academic Prgrams about this error (error: 001)');
      Actions.popTo('Authentication');
      return;
    }

    // Read all user information and filters out non-program user data
    const db = firebase.database();
    db.ref('users').once('value', (snapshot) => {

      console.log('User Master Firebase read Success');
      let data = snapshot.val();

      // remove non-program related users
      for (let uid of Object.keys(data)) {
        if (data[uid].programId != store.getState().userData.programId ||
          data[uid].programYear != store.getState().userData.programYear) 
          delete data[uid];
      }

      // Save the User master list to Redux
      store.dispatch({type: ActionList.ADD_USER_MASTER_LIST, userList: data});

      }, (error) =>{
        Alert.alert('Connection Error', 'Problem downloading user information. Please check your internet connection: ' + error.code);
        Actions.popTo('Authentication');
    });
  }


  // With the user information get the program data. This function will listen to the database for any changes. Requires userData to be defined
  export const getProgramData = () => {
    let dBURLProgram = 'programs/' + store.getState().userData.programId + '/' + store.getState().userData.programYear;

    // Returns to the login page if userData is undefined (Should never happen)
    if (store.getState().userData == undefined) {
      Alert.alert('User data undefined', 'Please contact Oxbridge Academic Prgrams about this error (error: 001)');
      Actions.popTo('Authentication');
      return;
    }

    // Grab the program information from the DB
    const db = firebase.database();
    db.ref(dBURLProgram).on('value', (snapshot) => {

      // Save the program information to redux
      store.dispatch({type: ActionList.ADD_PROGRAM_DATA, program: snapshot.val()});

      // Store the listener if it doesn't exist
      store.dispatch({type: ActionList.ADD_DB_LISTENER, dbURL: dBURLProgram});

      console.log('Programs Firebase redux updated');

      }, (error) =>{
        Alert.alert('Connection Error', 'Problem downloading program information. Please check your internet connection: ' + error.code);
        Actions.popTo('Authentication');
    });
  }

  // Get the messages made by the user
  export const getMessageData = () => {

    // Return if no channels exist:
    if (store.getState().userData.channels == undefined) {
      console.log('No messages found');
      return;
    }

    let channelIdArr = Object.values( store.getState().userData.channels );
    const db = firebase.database();

    // Get the relevant message information from the database
    for (let channel of channelIdArr) {
      let dBURLChannel = 'channels/' + channel.uid;

      // Create a listener for each message channel
      db.ref(dBURLChannel).on('value', (snapshot) => {
        // Store the listener on redux
        store.dispatch({type: ActionList.ADD_DB_LISTENER, dbURL: dBURLChannel});

        // Store the program on redux
        store.dispatch({type: ActionList.ADD_MESSAGE_DATA, channelData: snapshot.val()});

        console.log(channel.uid + ' Message Channel redux updated');
      }, (error) => {
        Alert.alert('Connection Error', 'Problem downloading message information. Please check your internet connection: ' + error.code);
        Actions.popTo('Authentication');
      });
      
    }

  }


  // Remove listeners to the database and remove URLs from Redux
  export const detachAllFirebaseListeners = () => {

    if (store.getState().dbListener == undefined ||
      store.getState().dbListener == [])
      return;
    // turn off all active DB listeners
    for (let url of store.getState().dbListener) {
      firebase.database().ref(url).off();
      console.log(url + ' listener is off');
    }

    // Remove the urls from the array
    store.dispatch({type: ActionList.REMOVE_ALL_DB_LISTENER, userList: []});
  }

/************************************************************************************************
*
* Authentication functions (globally listens to user login status)
*
*************************************************************************************************/

  // Check Firebase Authentication and logout
  export const userLogout = () => {

    // Turn off the Auth listener
    unsubscribe();
    unsubscribe = null;

    // Detach all listeners, logout, and go to loginpage
    detachAllFirebaseListeners();

    // Return if the currentUser is null
    if (firebase.auth().currentUser == undefined) {

      console.log( 'User not logged in');
      Actions.reset('root');

      // Remove all information from the DB
      store.dispatch({type: ActionList.REMOVE_ALL});

    } else {

      console.log( firebase.auth().currentUser.uid + ' logging out');

      // Logout the current user
      firebase.auth().signOut().then( () => {

        Actions.reset('root');

        // Remove all information from the DB
        store.dispatch({type: ActionList.REMOVE_ALL});

      }).catch( (error) => {
        Alert.alert('Error Logging Out', error.code);
      });
    }
  }


  // Check Firebase Authentication and logout
  export const userLogin = (username, password) => {

    console.log('Attempting to Log in');

    // Log the user in
    firebase.auth().signInWithEmailAndPassword(username,
        password).then( (user) => {

          // On success
          console.log('Login Success: ' + username);

          // Establish a user listener
          unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // Do Nothing
            } else {
              // Log out and turn off all listeners
              userLogout();
            }
          });

          // Navigate to the splash page
          Actions.Splashpage();

        }).catch( (error) => {

          // Handle different errors
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/invalid-email')
            Alert.alert('Invalid Email', 'Please enter a valid email address');
          else if (errorCode == 'auth/wrong-password')
            Alert.alert('Incorrect Email/Password', '');
          else if (errorCode == 'auth/user-not-found')
            Alert.alert('User Not Found', 'The account for this email does not exist');
          else
            Alert.alert( errorCode, errorMessage );
        });
  }

/************************************************************************************************
*
* Add/Delete functions for the SignUp Component
*
*************************************************************************************************/
  /* Function to add events to personal calendar 
      - If the state: true, then the event will be deleted
      - If the state: false, then the event will be added
  */
export const addOrDeleteEvent = async (uid, eid, state) => {
  let error = {bool: false};

    // Step 1: add/remove the event from the user list
    await addOrDeleteHandleDatabase('users/'+uid+'/events', state, eid, error);

    // Step 2: add/remove the user from the event list
    await addOrDeleteHandleDatabase('programs/'+store.getState().userData.programId+'/'+store.getState().userData.programYear+'/events/'+eid+'/attendees', state, uid, error);

    // Step 3: push the notification
    Actions.FeedbackComponent({
      error: error.bool,
      state: state,
      eid: eid,
      uid: uid,
    });
  }


export const addOrDeleteHandleDatabase = (url, state, id, error) => {
    let db_ref = firebase.database().ref(url);
    // Delete the child if state is true, otherwise add child
    if (state) {
      // Delete the data from the db
      db_ref.orderByChild('uid').equalTo(id)
        .once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {

            //remove each child
            db_ref.child(childSnapshot.key).remove();
        });
      }, (error) => {
        if (error) {
          Alert.alert(error.code);
          console.log(error);
          error.bool = true;
        }
      });
    } else {
      // Write the data to the db
      db_ref.push({'uid':id}, (error) => {
        if (error) {
            Alert.alert(error.code);
            console.log(error);
            error.bool = true;
        }
      });
    }

  }

/************************************************************************************************
*
* Add/Delete functions for Chat Component
*
*************************************************************************************************/

export const submitMessage = (uid, data) => {
  let dbURL = 'channels/' + uid + '/messages';

  // We push the key along with the data object
  updateArr = {}
  const key = firebase.database().ref( dbURL ).push().key;
  updateArr[dbURL + '/' + key] = Object.assign({}, data, {uid: key});

  // Push the updates to the databse
  firebase.database().ref().update(updateArr, (error) => {
    if (error) {
      Alert.alert(error.code);
      console.log(error);
    }
  });
}
