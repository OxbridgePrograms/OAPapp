import ActionList from './actions/ActionList';
import {sortByTime} from './../functions/DateFunctions';
import {detachFirebaseListener} from './../functions/DbFunctions';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case ActionList.ADD_USER_DATA: {
			return Object.assign({}, state, {userData: action.userData});
		}
		case ActionList.ADD_PROGRAM_DATA: {
			let data = Object.assign({}, action.program);
			data.eventIdSorted = sortByTime( Object.values(data.events) );
			return Object.assign({}, state, {program: data} );
		}
		case ActionList.ADD_USER_MASTER_LIST:
			return Object.assign({}, state, {userList: action.userList} );
		case ActionList.REPLACE_USER_EVENTS: {
			const data = Object({}, state.userData, {events: action.events});
			return Object.assign({}, state, {userData: data});
		}
		case ActionList.ADD_DB_LISTENER: {
			let data = [];
			if (state.dbListener !== undefined)
				data = state.dbListener.slice(0);
			if (!data.includes(dBURLUser))
				data.push( action.dbURL );
			console.log(action.dbURL + ' listener is on');
			return Object.assign({}, state, {dbListener: data});
		}
		case ActionList.REMOVE_ALL_DB_LISTENER: {
			return Object.assign({}, state, {dbListener: []});
		}
		case ActionList.REMOVE_BY_KEY: {
			let data = Object.assign({}, state);
			delete data[action.key]
			return data;
		}
		case ActionList.REMOVE_ALL: {
			return {};
		}
		default:
			return state;

	}
}

export default reducer;