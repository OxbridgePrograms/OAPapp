import {submitMessage} from './DbFunctions';

// Takes the message packet constructed by react native gifted chat and inserts the correct information
export const sendMessage = (userData, channelId, dataObj) => {
	// Construct the message object (replace old data)
	let data = Object.assign({}, dataObj[0]);
	data.createdAt = (new Date()).getTime();
	data.user = createUserPacket(userData);
	data.sent = false;
	
	// Send the message
	console.log('Submitting Message:');
	console.log( data );

	submitMessage(channelId, data);
}

// Constructs the user packet
const createUserPacket = (userData) => {
	// Only send the user ID
	let data = {
		_id: userData.uid,
		name: userData.firstName + ' ' + userData.lastName
	};

	// gets the user avatar image if applicable
	if (userData.image)
		data.avatar = userData.image;

	return data;
}

// Used to sort the messages from the database
export const compareMessages = (m1, m2) => {
	if(m1.createdAt > m2.createdAt)
		return -1;
	else if(m1.createdAt < m2.createdAt)
		return 1;
	else
		return 0;
}