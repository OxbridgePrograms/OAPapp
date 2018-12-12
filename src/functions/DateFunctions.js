import styles, {monthLabels, weekLabels} from '../style/styles';

// Converts a date (in MS) to user-readable strings
export const date2String = (dateMS) => {
  let dateStr = {};
  let dateObj = new Date(dateMS);
  dateStr.month = monthLabels[dateObj.getMonth()];
  dateStr.dayOfWeek = DayOfWeek(dateMS);
  dateStr.year = dateObj.getFullYear();
  dateStr.day = dateObj.getDate();
  
  dateStr.date = monthLabels[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + + dateObj.getFullYear();

  let offset = 0;
  let timeLabel = 'AM';
  if (dateObj.getHours() >= 12) {
    offset -= 12;
    timeLabel = 'PM';
  }
  if (dateObj.getHours() == 12 || dateObj.getHours() == 0)
    offset += 12;

  let sec = '0' + dateObj.getMinutes();
  sec = sec.substring(sec.length - 2);

  dateStr.time = (offset + dateObj.getHours()) + ':' + sec + ' ' + timeLabel;
  

  return dateStr;
}

/* Takes an array (Obj) of Obj, Returns an array sorted by startTime */
export const sortByTime = (obj) => {
  var filteredObj = [];
  for (let e of obj) {
    if (filteredObj.length == 0)
      filteredObj.push( Object.assign({}, {uid: e.uid}) );
    else {
      // Find where the new event element should be if the list is non-empty
      for (let i = 0; i < filteredObj.length; i++) {
          if ( filteredObj[i].startTime >= e.startTime ) {
            filteredObj.splice(i, 0, Object.assign({}, {uid: e.uid}) );
            break;
          } else if ( i == filteredObj.length - 1) {
            filteredObj.push( Object.assign({}, {uid: e.uid}) );
            break;
          }
      }
    }
  }
  return filteredObj;
}

// Takes MS and returns object whose fields indicate the 24 hour range
export const getDayRange = (dateMS) => {
  let d1 = new Date(dateMS);

  d1 = new Date(d1.getFullYear(),
    d1.getMonth(),
    d1.getDate());

  let d2 = new Date(d1.getFullYear(),
    d1.getMonth(),
    d1.getDate() + 1);

  return {startTime : d1.getTime(),
    endTime : d2.getTime()};
}

// Takes an array of object Ids and returns the objects that are within the [startDate, endDate] interval
export const filterByRange = (obj, objIds, startDate, endDate) => {
  let newObj = [];
  for (let e of objIds) {
    if ( obj[e.uid].endTime >= startDate && obj[e.uid].startTime < endDate)
      newObj.push( Object.assign({}, {uid: e.uid}) );
  }
  return newObj;
}

/* Checks if object is in an array */
export const idNotInArray = (id, array) => { 
  for(let e of array) {
    if(e.uid == id)
      return false;
  }
  return true;
};

{/*The Calendar gets (1) Program dates and (2) the current date. If the current date is < the program start date, the date will start at the program start. Otherwise it will start at the end*/}
export const centerDate = (programDates) => {
  let today = new Date();
  today = today.getTime();

  if (today < programDates.startDate)
    return programDates.startDate;
  else if (today > programDates.endDate)
    return programDates.endDate;
  else
    return today;
}

{/*Helper Function: gets the index of the date given programDates */}
export const getIndex = (dateMS, programDates) => {
  var offset = dateMS - programDates.startDate;
  offset = Math.floor(offset / (1000 * 60 * 60 * 24));  // Convert MS to days
  return offset;
}

{/*Helper Function: Convert date to day of the year (1 - 366)*/}
export const dayOfYear = (date) => {
  let start = new Date(date.getYear(), 0, 0);
  index = date.getTime() - start.getTime();
  index = Math.floor(index / (1000 * 60 * 60 * 24)) + 1;
  return index;
}

{/*Generate the date data. Takes Linear time*/}
export const generateDates = (focusedDate, programDates) => {
  var data = [];
  var curr = Object.assign({}, {date : programDates.startDate});
  const dayOffset = (1000 * 60 * 60 * 24);

  while (curr.date <= programDates.endDate){

    curr.focused = false;
    if (curr.date == focusedDate) {
      curr.focused = true;
    }

    data.push( Object.assign({},curr) );
    curr.date += dayOffset;
  }
  return data;
}

export const DayOfWeek = (dateMS) => {
  let dayOfWeek = new Date(dateMS);
  return weekLabels[dayOfWeek.getDay()];
}