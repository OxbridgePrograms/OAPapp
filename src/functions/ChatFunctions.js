import {submitMessage,
	updateReadStatus} from './DbFunctions';
import {date2String} from './DateFunctions';
import React, {Component} from 'react';
import {Ionicons} from '@expo/vector-icons';
import styles from '../style/styles';
import {Image, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  View} from 'react-native';

/************************************************************************************************
*
* Message Creation Functions
*
*************************************************************************************************/

// Takes the message packet constructed by react native gifted chat and inserts the correct information
export const sendMessage = (userData, channelArr, channelId, dataObj) => {

	// Construct the message object (replace old data)
	let data = Object.assign({}, dataObj[0]);
	data.createdAt = (new Date()).getTime();
	data.user = createUserPacket(userData);
	data.sent = false;

	// Send the message
	console.log('Submitting Message:');
	console.log( data );

	// Check if channel exists
	if ( channelArr[channelId] == undefined ) {
		// Create channel
	} else
		submitMessage(channelId, data);
}

// Constructs the user packet to insert in the message
const createUserPacket = (userData) => {

	let data = {
		_id: userData.uid,
		name: userData.firstName + ' ' + userData.lastName
	};

	// gets the user avatar image if applicable
	if (userData.image)
		data.avatar = userData.image;

	return data;
}

/************************************************************************************************
*
* Comparison Functions for Sorting
*
*************************************************************************************************/

// Used to sort the messages from the database
export const compareMessages = (m1, m2) => {
	if(m1.createdAt > m2.createdAt)
		return -1;
	else if(m1.createdAt < m2.createdAt)
		return 1;
	else
		return 0;
}

// Used to sort the messages in the inbox
// The inbox will be sorted based on the most recent message
export const compareChannels = (c1, c2) => {
	let t1 = c1.messages[0].createdAt;
	let t2 = c2.messages[0].createdAt;
	if (t1 > t2)
		return -1;
	else if (t1 < t2)
		return 1;
	else
		return 0;
}

/************************************************************************************************
*
* Message Tracking (e.g. marking as read)
*
*************************************************************************************************/

// Marks the messages as read and updates on DB
export const markAsRead = (userId, channelId) => {

	// Assumes that the channel exists
	let dbURL = '/channels/' + channelId + '/users/' + userId + '/read';
	let updateArr = {[dbURL]: true};

	// Write to the database
	updateReadStatus(updateArr);
}

/************************************************************************************************
*
* Functions for the chat Title and inbox previews
*
*************************************************************************************************/

// Auto generate the title of the chat if one doesn't exist
export const generateTitle = (userList, userArr, userId) => {
	
	// remove the current user from the Object
	userArrCopy = Object.assign({}, userArr);
	delete userArrCopy[userId];
	userArrCopy = Object.keys(userArrCopy);

	// The title is the other user's name or a combination of all the users' names
	if (userArrCopy.length == 0) {
		return 'Undefined User';
	} else if (userArrCopy.length == 1) {
		titleStr = userList[ userArrCopy[0] ].firstName + ' ' + userList[ userArrCopy[0] ].lastName;
		return titleStr;
	} else {
		titleStr = [];
		for (let otherUserId of userArrCopy) {
			titleStr.push( userList[ otherUserId ].firstName );
		}
		return titleStr.join(', ');
	}


}

// Get the avatar image for the chat (inidividual is the other's profile picture)
//		This function returns a component
export const generateAvatar = (userList, userArr, userId) => {

	// remove the current user from the Object
	userArrCopy = Object.assign({}, userArr);
	delete userArrCopy[userId];
	userArrCopy = Object.keys(userArrCopy);

    let imageBubble = (<Ionicons size={50} name="md-person" color={'#EBEBEB'} />);

   	if (userArrCopy.length == 1) {
		if ( userList[ userArrCopy[0] ].image )
			imageBubble = (<Image source={{uri : userList[ userArrCopy[0] ].image}} style={styles.messengerUserProfileLarge}/>);
	} else {
		// TODO: Group chat avatar (Potentially default avatar until )
	}

	return imageBubble;

}

// The display for the chat preview (person's name if not userId, You otherwise)
// The most recent chat message is displayed
export const generateChatPreview = (messageArr, userId) => {
	// Most recent message
	recentMessage = messageArr[0];
	authorStr = '';
	messageStr = recentMessage.text;

	// Change the author string
	if (recentMessage.user._id == userId)
		authorStr = 'You: ';

	// Change the message
	if (recentMessage.image !== undefined)
		messageStr = 'sent an Image';

	strObj = {
		message: authorStr + messageStr,
		timeStamp: generateTimeStamp(recentMessage)
	}
	return strObj;
}

// Return the time stamp of the most recent message
export const generateTimeStamp = (messageObj) => {
	// Get beginning of day:
	let dayBeginning = new Date();
	dayBeginning.setHours(0, 0, 0, 0);

	// Get beginning of week:
	let weekBeginning = new Date();
	weekBeginning.setHours(0, 0, 0, 0);
	weekBeginning.setDate( weekBeginning.getDate() - weekBeginning.getDay() );

	// Get the current day information
	let currentTime = new Date(messageObj.createdAt);
	let currentTimeStr = date2String( currentTime.getTime() );
	let prepend = '  \u2022 ';

	// Return the correct String
	if (currentTime >= dayBeginning) {
		return prepend + currentTimeStr.time;
	} else if (currentTime >= weekBeginning) {
		return prepend + currentTimeStr.dayOfWeek.substring(0,3);
	} else {
		return prepend + currentTimeStr.month.substring(0,3) + ' ' + currentTimeStr.day;
	}
}

/************************************************************************************************
*
* Channel Creation
*
*************************************************************************************************/

// Creates a local chat for the user to create the channel (channel is NOT created until the message is sent)
export const composeMessage = (userIdArr) => {
	// Create initial message
	initMessage = {
		_id: 'm1',
		text: 'Welcome to Oxbridge, Say Hi!',
		createdAt: (new Date()).getTime(),
		system: true
	}

	// Add the users to the channel
	users = {};
	for (let uid of userIdArr) {
		users[uid] = {
			uid: uid,
			read: false};
	}

	// Return the message in phone format, note that uid is absent because it doesn't exist in the DB
	let channelObj = {
		messages: [initMessage],
		users: users
	};

	return channelObj;

}

// Returns a channelId if one exists, false otherwise
export const channelExists = (channelArr, userIdArr) => {

	// Check every channel for a match
	for ( let channelId of Object.keys( channelArr ) ) {

		let userObj = channelArr[ channelId ].users;
		let matching = true;

		// Check every user if the lengths are the same
		if (Object.keys( userObj ).length == userIdArr.length) {
			for ( let uid of userIdArr ) {
				if ( userObj[ uid ] == undefined )
					matching = false;
			}
		} else {
			matching = false;
		}

		// return the match
		if (matching)
			return channelId;
	}

	// Return false if we do not find a match
	return false;
}


/************************************************************************************************
*
* Search Bar functions
*
*************************************************************************************************/

// Returns the list of channels that match any substring in the first/last name
export const filterMessages = (messageObj, userId, userList, inputStr) => {
	let filteredList = {};
	let expression = inputStr.toLowerCase();

	// Iterate through all the channels
	for (let channelId of Object.keys(messageObj)) {
		// check for user matches and add to list if there is a match
		for (let uid of Object.keys(messageObj[channelId].users)) {
			if (uid != userId) {
				let testStr = userList[uid].firstName.toLowerCase() + ' ' + userList[uid].lastName.toLowerCase();
				if (testStr.indexOf(expression) >= 0)
					filteredList[channelId] = messageObj[channelId];
			}
		}
	}

	return filteredList;
}
