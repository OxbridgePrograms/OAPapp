import {submitMessage} from './DbFunctions';


export const sendMessage = (userData, channelId, text, dataObj={}) => {
	// Construct the message object
	let data = Object.assign({}, dataObj);
	data.text = text;
	data.createdAt = (new Date());
	data.user = createUserPacket(userData);

	// Send the message
	submitMessage(channelId, data);
}

// FB only stores the userId of sender, we need to expand
export const decodeUser = (userList, uid) => {

	// Initialize the default
	let data = {
		_id: uid,
		name: 'Unknown User'
	};

	// Write data if user exists
	if ( Object.keys(userList).includes(uid) ) {
		data = {
			_id: uid,
			name: userList[uid].firstName + ' ' + userList[uid].lastName
		};
		if ( userList[uid].image )
			data.avatar = userList[uid].image;
	}

	return data;
}

// Constructs the user packet
const createUserPacket = (userData) => {
	// Only send the user ID
	let data = {uid: userData.uid};
	return data;
}

const removeUser = (channel, uid) => {
	// Remove the user from the channel
	delete channel.users[uid];
	// if ( Object.values(channel.users) < 2 )
}