import React, { Component } from 'react';
 
import { Alert,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Actions} from 'react-native-router-flux';

import * as firebase from 'firebase';
import {throttle} from 'lodash';
import styles from '../style/styles';

import ActionList from './../redux/actions/ActionList';
import { connect } from 'react-redux';
import {store} from './../index';

import {idNotInArray} from './../functions/DateFunctions';
import {addOrDeleteEvent} from './../functions/DbFunctions';

import Modal from 'react-native-modalbox';

//State tracker for DisplayEvents
const mapStateToProps = (state) => {
  return {userData: state.userData};
}

class SignUpComponent extends Component {
	
	state = {};
	
	constructor (props) {
    	super(props);
    	this._buttonEvent = throttle(this._buttonEvent,
            1000, 
            {leading:true, trailing:false});
  	}


	/* Function to add events to personal calendar 
      - If the state: true, then the event will be deleted
      - If the state: false, then the event will be added
  */
  _buttonEvent = (uid, eid, state) => {
    addOrDeleteEvent(uid, eid, state);
  }

  render()  {
  	let styling = [];

  	if (this.props.type == 'large') {
  		// Add/Delete button for the event page (large button)
	    if ( this.props.userData.events == undefined || idNotInArray(this.props.eid, Object.values(this.props.userData.events)) ) {
	      styling[0] = styles.eventAddButtonLarge;
	      styling[1] = styles.eventAddTextLarge;
	      styling[2] = false;
	      styling[3] = 'Sign Up';
	    } else {
	      styling[0] = styles.eventDeleteButtonLarge;
	      styling[1] = styles.eventDeleteTextLarge;
	      styling[2] = true;
	      styling[3] = 'Withdraw';
	    }
  	} else if (this.props.type == 'small') {
	  	// Add/Delete button for the event listings (small button)
	    if ( this.props.userData.events == undefined || idNotInArray(this.props.eid, Object.values(this.props.userData.events)) ) {
	      styling[0] = styles.eventAddButton;
	      styling[1] = styles.eventAddText;
	      styling[2] = false;
	      styling[3] = '+';
	    } else {
	      styling[0] = styles.eventDeleteButton;
	      styling[1] = styles.eventDeleteText;
	      styling[2] = true;
	      styling[3] = '-';
	    }
	}

    return (
      <TouchableOpacity onPress={() => this._buttonEvent(this.props.uid, this.props.eid, styling[2])}>
        <View style={styling[0]}>
            <Text style={styling[1]}>{styling[3]}</Text>
        </View>
      </TouchableOpacity>
      )
  }


}

export default connect(mapStateToProps)(SignUpComponent);