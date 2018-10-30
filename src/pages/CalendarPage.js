// app/routes/CalendarPage.js

import React, {Component} from 'react';
import {Alert, 
  Image, 
  Text, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  ActivityIndicator,
  View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import styles, {monthLabels, weekLabels, calendarWidth} from '../style/styles';

// Custom components
import {generateDates, 
  centerDate, 
  getIndex,
DayOfWeek} from '../functions/DateFunctions';
import DisplayEvents from '../components/DisplayEvents';

import { connect } from 'react-redux';

import * as firebase from 'firebase';

// Date card are the components to the individual calendar squares
const DateCard = (props) => {
  var curr = new Date(props.date.date);
  let dayOfWeek = weekLabels[curr.getDay()].substring(0, 3);

  // Different stylings if focused or Sunday
  styling = [styles.dateContainer, 
    styles.dateMonthText, 
    styles.dateDayText, 
    styles.dateYearText];
  if (props.date.focused) {
    styling[0] = styles.dateContainerSelected;
  } else if (dayOfWeek === 'Sun') {
    styling[0] = styles.dateContainerSunday;
    styling[1] = styles.dateMonthTextSunday;
    styling[2] = styles.dateDayTextSunday;
    styling[3] = styles.dateYearTextSunday;
  }

  // Returns the date card with the proper styling
  return (
    <View style={styling[0]}>
      <Text style={styling[1]}>{monthLabels[curr.getMonth()].substring(0,3)}</Text>
      <Text style={styling[2]}>{curr.getDate()}</Text>
      <Text style={styling[3]}>{dayOfWeek}</Text>
    </View>
    );
}

//Function to feed Homepage with data as props
const mapStateToProps = (state) => {
  return {program: state.program,
    userData: state.userData,
    userEvents: state.userData.events};
}

class CalendarPage extends Component {

  state = {};

  constructor (props) {
    super (props);
    this.state.focusedDate = centerDate(this.props.program.programDates);
    this.state.dateData = generateDates(this.state.focusedDate, this.props.program.programDates);
  }

  componentDidMount () {
    var user = firebase.auth().currentUser;
    if (user) {
    } else {
      Actions.Authentication();
    } 
  }

  _onPressItem = (ind1, ind2) => {
    this.setState((prevState) => {
      prevState.dateData[ind1].focused = false;
      prevState.dateData[ind2].focused = true;
      prevState.focusedDate = prevState.dateData[ind2].date;
      this._flatRef.scrollToIndex({index: ind2});
      return prevState;
    });
  }

  _renderItem = ({item}) => 
                  (<TouchableOpacity
                    onPress={() => 
                        this._onPressItem(getIndex(this.state.focusedDate, this.props.program.programDates), getIndex(item.date, this.props.program.programDates))
                    }>
                      <DateCard date={item} />
                  </TouchableOpacity>);

  render() {
    return (
      <View style={styles.scroll}>
            <ScrollView style={styles.scrollCalendar}>
              <DisplayEvents focusedDate={this.state.focusedDate} type={'date'}/>
              <View style={styles.buffer} />
            </ScrollView>
        <View style={styles.calendarBannerContainer} elevation={10}>
            <Text style={styles.calendarTitle}>Program Schedule</Text>
            <View style={{backgroundColor:'white'}}>
              <FlatList 
                data={this.state.dateData} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                ref={(ref) => {this._flatRef = ref}}
                renderItem={this._renderItem} 
                initialNumToRender={14}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                getItemLayout={(data,index) => (
                    {length: calendarWidth, offset: calendarWidth * index, index}
                  )}
                initialScrollIndex={getIndex(this.state.focusedDate, this.props.program.programDates)}
              />
            </View>
          </View>
        </View>

      );
  }
}

export default connect(mapStateToProps)(CalendarPage);