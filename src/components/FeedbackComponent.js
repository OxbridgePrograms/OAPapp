import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator,
  Easing,
  View} from 'react-native';
// import {BlurView} from 'expo';
import {Actions} from 'react-native-router-flux';
import {
  date2String
} from './../functions/DateFunctions';

import * as firebase from 'firebase';
import { connect } from 'react-redux';

import Modal from 'react-native-modalbox';
import SignUpComponent from './../components/SignUpComponent';
import {addOrDeleteEvent} from './../functions/DbFunctions';

// Custom components
import styles, {lightBoxWidth, weekLabels} from '../style/styles';

//Function to feed Homepage with data as props
const mapStateToProps = (state) => {
  return {};
}

class FeedbackComponent extends Component {

  timerRef;

  constructor (props) {
    super(props);
    this.state = {
      swipeToClose: true
    };

    // Three states for the sign up component:
    if (this.props.error) {
      this.state.text = 'Error, please try again later';
      this.state.showButton = false;
    } else {
      this.state.showButton = true;
      if (this.props.state) {
        this.state.text = 'Remove Successful';
      } else {
        this.state.text = 'Add Successful';
      }
    }

    // Close out of the notification after 10 seconds if it is still alive
    timerRef = setTimeout(() => {
      if (this.refs.modalFeedback != undefined)
        this.refs.modalFeedback.close();
    }, 10000);

  }

  // Slide up when the component is loaded
  componentDidMount() {
    this.refs.modalFeedback.open();
  }

  // Update the timer, text content, and button content
  componentDidUpdate(prevProps, prevState) {
    // Three states for the sign up component:
    if (this.props != prevProps) {
      // Reset the timer
      clearTimeout(timerRef);
      timerRef = setTimeout(() => {
        if (this.refs.modalFeedback != undefined)
          this.refs.modalFeedback.close();
      }, 10000);

      // Change the content
      if (this.props.error) {
        this.setState( (prevState) => {
          prevState.text = 'Error, please try again later';
          prevState.showButton = false;
          return prevState;
        });
      } else {
        this.state.showButton = true;
        if (this.props.state) {
          this.setState( (prevState) => {
            prevState.text = 'Remove Successful';
            prevState.showButton = true;
            return prevState;
          });
        } else {
          this.setState( (prevState) => {
            prevState.text = 'Add Successful';
            prevState.showButton = true;
            return prevState;
          });
        }
      }
    }
  }

  onClose() {
    // pop the modal and 
    Actions.pop(); 
  } 

  render() {
    undoComponent = [];
    if (this.state.showButton)
      undoComponent = (<TouchableOpacity onPress={() => addOrDeleteEvent(this.props.uid, this.props.eid, !this.props.state)}>
        <Text style={styles.notificiationLink}>Undo</Text>
        </TouchableOpacity>);

    return (
          <View style={styles.notificationContainer}>
            <Modal
            style={styles.notificationContainerModal}
            position={"center"}
            onClosed={this.onClose}
            ref={"modalFeedback"}
            backdrop={false}
            easing={Easing.elastic(0)}
            swipeToClose={this.state.swipeToClose}>
              <Text style={styles.notificiationText}>{this.state.text}</Text>
              {undoComponent}
            </Modal>
          </View>
      );
  }
}

export default connect(mapStateToProps)(FeedbackComponent);