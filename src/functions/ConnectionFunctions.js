import {NetInfo} from 'react-native';

// Handler function for any connection change
const handleFirstConnectivityChange = (connectionInfo) => {
	// Log connection type
  	console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);

  	
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}

// Function to initialize connection listener
NetInfo.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);