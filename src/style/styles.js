import { StyleSheet, Platform, Image, Dimensions } from 'react-native';

// Styling constants

const h1 = 32;
const h2 = 24;
const h3 = 18;
const p1 = 14;

// Height/Widths for the profile banner + image
const {height, width} = Dimensions.get('window');
export const calendarWidth = width/7;
const profileBannerWidth = width - width/7;
const profileBannerMargin = (width/7)/2;
export const profilePictureWidth = 120;
const profilePictureMargin = (width - profilePictureWidth)/2;

// Height/Width for the modal cards
const lightBoxWidth = 4 * width / 5;
const lightBoxHeight = 2 * height / 3;

// Fonts for the application
// const titleFont = 'Montserrat-Regular';
// const subTitleFont = 'Montserrat-Regular';
// const subTitleFontLight = 'Montserrat-Regular';
// const textFont = 'Muli-Light';
// const textFontBold = 'Muli-Bold';

// const titleFont = 'San-Francisco-Regular';
// const subTitleFont = 'San-Francisco-Bold';
// const subTitleFontLight = 'San-Francisco-Regular';
// const textFont = 'San-Francisco-Regular';
// const textFontBold = 'San-Francisco-Bold';

const titleFont = 'Roboto-Light';
const subTitleFont = 'Roboto-Regular';
const subTitleFontLight = 'Roboto-Regular';
const textFont = 'Roboto-Regular';
const textFontBold = 'Roboto-Bold';

// Note that throughout the styling sheet we sometimes use RGBA instead of hex codes because of opacity -- these constants serve as universal references
const c1 = '#093266';
const c2 = '#7C7F83';
const c3 = '#EBEBEB';
const c4 = '#FFFFFF';
const c5 = '#028bff';
const cError = 'red';

export const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const weekLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export default styles = StyleSheet.create({

  // Generic stylings
  buttonText: {
    fontSize: h3,
    padding: 10,
    textAlign: 'center',
    fontFamily: subTitleFontLight,
    color: c4,
  },
  buttonWrapper: {
		backgroundColor: c5,
		marginBottom: 10,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c5,
  },

  // Types of containers
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  containerBottomCenterColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'stretch',
    paddingBottom: 15,
  },
  containerBottomLeftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  containerTopLeftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  containerEvenCenterColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    padding: 10,
  },

  form: {
    width: 300,
  },
  image: {
    margin: 10,
  },
  inputText: {
    marginBottom: 10,
    padding: 5,
    fontSize: p1,
    fontFamily: subTitleFontLight,
    color: c4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: h1,
    margin: 10,
    textAlign: 'center',
  },
  loginLogo: {
    width: 250,
    resizeMode: Image.resizeMode.contain,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: c4,
  },
  backgroundImageFilter: {
    flex: 1,
    backgroundColor: 'rgba(9, 50, 102, 0.5)',
    alignSelf: 'stretch',
  },
  backgroundImageGradientFilter: {
    flex: 1,
    alignSelf: 'stretch',
  },

  //NavBar Styling
  navBar: {
    backgroundColor: c4,
  },
  navBarTitle: {
    fontSize: h2
  },
  navBarDrawer: {
    backgroundColor: 'rgba(9, 50, 102, 0.5)',
  },

  //Generic Texts
  subTitle: {
    fontFamily: subTitleFont,
    fontSize: h3,
    marginBottom: 5,
    color: c4,
  },

  // Scroll View
  scroll: {
    backgroundColor: c4,
    flex: 1,
  },
  //Need to set top margin to make up for absolute
  scrollCalendar: {
    backgroundColor: c4,
    marginTop: 150,
    paddingTop: 25,
  },
  buffer: {
    height: 20,
  },

  // This styling is for the banner
  bannerContainer:  {
    alignSelf: 'stretch',
    height: 280,
    marginBottom: 10,
    backgroundColor: c1,
  },
  bannerTextBox: {
    marginLeft: 15,
    marginBottom: 15,
  },
  bannerDataContainer: {
    marginLeft: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  bannerText: {
    fontFamily: titleFont,
    textAlign: 'left',
    fontSize: h1,
    color: c4,
  },
  bannerSubText: {
    fontFamily: subTitleFont,
    textAlign: 'left',
    fontSize: p1,
    color: c4,
  },
  bannerDateContainer: {
    backgroundColor: c4,
    height: 20,
    width: 20,
    borderRadius: 3,
    marginRight: 10,
    fontFamily: subTitleFont,
    textAlign: 'center',
    fontSize: p1,
    color: c1,
  },

  // Styling for the announcements
  announcementUserProfile: {
    height: 64,
    width: 64,
    borderRadius: 32,
    resizeMode: Image.resizeMode.cover,
  },
  announcementIconContainer: {
    flex: 1,
    backgroundColor: c4,
    alignSelf: 'stretch',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementBodyContainer: {
    paddingLeft: 10,
    flex: 4,
  },

  // Styling for the events
  eventsContainer: {
    backgroundColor: c4,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  eventsHeaderContainer: {
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: c1,
  },
  eventTitle: {
    fontSize: h3,
    fontFamily: textFontBold,
  },
  eventTime: {
    marginTop: 5,
    fontSize: p1,
    fontFamily: textFont,
    color: c5,
  },
  eventLocation: {
    fontSize: p1,
    fontFamily: subTitleFont,
  },
  eventDescription: {
    marginTop: 5,
    fontSize: p1,
    fontFamily: textFont,
    lineHeight: 18,
    color: c2
  },
  eventImage: {
    height: 150,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    resizeMode: Image.resizeMode.contain,
    alignSelf: 'stretch',
  },
  noEventText: {
    marginTop: 10,
    textAlign: 'center',
    alignSelf: 'stretch',
    fontFamily: subTitleFontLight,
    fontSize: h3,
    color: c3,
  },
  eventAddButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: c1,
    backgroundColor: c1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventDeleteButton: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: c1,
    backgroundColor: c4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventAddText: {
    fontFamily: subTitleFont,
    fontSize: h1,
    color: c4,
    textAlign: 'center',
    paddingBottom: 3,
  },
  eventDeleteText: {
    fontFamily: subTitleFont,
    fontSize: h1,
    color: c1,
    textAlign: 'center',
    paddingBottom: 5,
  },
  eventAddButtonLarge: {
    alignSelf: 'stretch',
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: c1,
    backgroundColor: c1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  eventDeleteButtonLarge: {
    alignSelf: 'stretch',
    height: 36,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: c1,
    backgroundColor: c4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  eventAddTextLarge: {
    fontFamily: subTitleFont,
    fontSize: h3,
    color: c4,
    textAlign: 'center',
    paddingBottom: 3,
  },
  eventDeleteTextLarge: {
    fontFamily: subTitleFont,
    fontSize: h3,
    color: c1,
    textAlign: 'center',
    paddingBottom: 3,
  },

  //Styles for calendar
  dateContainer: {
    width: calendarWidth,
    height: 90,
    backgroundColor: c1,
  },

  // If the date is currently selected
  dateContainerSelected: {
    width: calendarWidth,
    height: 90,
    backgroundColor: c5,   
  },
  // If the date is Sunday
  dateContainerSunday: {
    width: calendarWidth,
    height: 90,
    borderColor: c1,
    borderWidth: 2,
    backgroundColor: c4,
  },
  dateMonthTextSunday: {
    fontSize: p1,
    fontFamily: subTitleFont,
    color: c1,
    textAlign: 'center',
    marginTop: 2,
  },
  dateDayTextSunday: {
    fontSize: h1,
    fontFamily: titleFont,
    color: c1,
    textAlign: 'center',
    marginTop: 2,
  },
  dateYearTextSunday: {
    fontSize: p1,
    fontFamily: subTitleFont,
    color: c1,
    textAlign: 'center',
    marginTop: 2,
  },
  // Default date text
  dateMonthText: {
    fontSize: p1,
    fontFamily: subTitleFont,
    color: c4,
    textAlign: 'center',
    marginTop: 2,
  },
  dateDayText: {
    fontSize: h1,
    fontFamily: titleFont,
    color: c4,
    textAlign: 'center',
    marginTop: 2,
  },
  dateYearText: {
    fontSize: p1,
    fontFamily: subTitleFont,
    color: c4,
    textAlign: 'center',
    marginTop: 2,
  },
  // Other calendar properties
  calendarContainer: {
    flex:1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: c4,
  },
  calendarTitle: {
    fontSize: h3,
    fontFamily: subTitleFontLight,
    color: c4,
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: c5,
  },
  calendarBannerContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    position: 'absolute',
    shadowColor: c2,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },

  // Styling for the Events page
  eventContentContainer: {
    backgroundColor: c4,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flex:1,
    flexDirection: 'column',
  },

  // Styling for profile page
  profileContainer: {
    position: 'absolute',
    paddingTop: 80,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    marginRight: profileBannerMargin,
    marginLeft: profileBannerMargin,
    width: profileBannerWidth,
    marginTop: 165,
    height: 185,
    backgroundColor: c4,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: c2,
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    borderWidth: 1,
    borderColor: c2,
    borderRadius: 10,
  },
  profilePictureContainer: {
    position: 'absolute',
    marginTop: 70,
    marginLeft: profilePictureMargin,
    marginRight: profilePictureMargin,
    height: profilePictureWidth,
    width: profilePictureWidth,
    borderRadius: profilePictureWidth/2,
    borderWidth: 1,
    borderColor: c1,
    backgroundColor: c4,
  },
  profilePicture: {
    borderRadius: profilePictureWidth/2,
    height: profilePictureWidth-2,
    width: profilePictureWidth-2,
    borderWidth: 1,
    borderColor: c3,
    overflow: 'hidden',
  },
  profileTitle: {
    fontFamily: titleFont,
    textAlign: 'center',
    fontSize: h1,
    color: c4,
  },
  profileSubTitle: {
    fontFamily: subTitleFont,
    textAlign: 'center',
    fontSize: p1,
    color: c4,
  },
  profileUserType: {
    fontFamily: subTitleFont,
    textAlign: 'center',
    fontSize: p1,
    color: c2,
  },
  profilePageBuffer: {
    height: 105,
    backgroundColor: 'rgba(255,255,255,0)',
  },

  // Styling for the drawer
  drawerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: c1,
    paddingTop: 50,
  }, 
  drawerItemText: {
    fontFamily: titleFont,
    textAlign: 'left',
    fontSize: h3,
    color: c4,
  },
  drawerIconContainer: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // For Event/Announcement
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
  eventContainer: {
    height: lightBoxHeight,
    width: lightBoxWidth,
    padding: 5,
    borderRadius: 10,
    backgroundColor: c4
  },

  // For Add/Delete event confirmation
  notificationContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  notificationContainerModal: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: c1,
  },
  notificiationText: {
    color: c4,
    fontSize: h3,
    fontFamily: subTitleFontLight,
  },
  notificiationLink: {
    color: c5,
    fontSize: h3,
    fontFamily: subTitleFontLight,
  },

  // For Messenger
  messengerInboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingRight: 15,
    paddingLeft: 15,
    height: 75
  },
  messengerAvatarContainer: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messengerPreviewContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  messengerUserProfileLarge: {
    height: 56,
    width: 56,
    borderRadius: 28,
    resizeMode: Image.resizeMode.cover,
  },
  inboxTitle: {
    fontSize: h3,
    fontFamily: textFont,
    textAlign: 'left'
  },
  inboxDescription: {
    marginTop: 3,
    fontSize: p1,
    color: c2,
    fontFamily: textFont,
    textAlign: 'left'
  },
  inboxTitleUnread: {
    fontSize: h3,
    fontFamily: textFontBold,
    textAlign: 'left'
  },
  inboxDescriptionUnread: {
    marginTop: 3,
    fontSize: p1,
    fontFamily: textFontBold,
    textAlign: 'left'
  },
  notificationIcon: {
    marginLeft: 15
  },
  inputTextBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0
  },
  inputComposer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 5,
    lineHeight: 18,
    backgroundColor: c4,
    borderRadius: 15
  },

  // SearchBar Style
  searchBar: {
    backgroundColor: c3,
    borderColor: c3,
    borderRadius: 20,
    padding: 3,
    marginTop: 5
  },
  searchBarText: {
    color: c2,
    fontSize: p1
  }
});