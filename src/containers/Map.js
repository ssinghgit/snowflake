import MapView from 'react-native-maps';

/**
 * # Login.js
 * 
 *  The container to display the Login form 
 * 
 */
'use strict';
/**
 * ## Imports
 * 
 * Redux 
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';

/**
 * Immutable
 */ 
import {Map} from 'immutable';

import
{  
  StyleSheet,
  View,
  Text
}
from 'react-native';

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender';

/**
 * The necessary React components
 */
import React from 'react';
const AppAuthToken = require('../lib/AppAuthToken').default;
const {
  LOGIN,
  REGISTER, 
  FORGOT_PASSWORD 
} = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */
const actions = [
  authActions
];

function mapStateToProps(state) {
  return {
      ...state
  };
}

function mapDispatchToProps(dispatch) {
	console.log(MapView);
  const creators = Map()
          .merge(...actions)
          .filter(value => typeof value === 'function')
          .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}
var styles = StyleSheet.create({
	map: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    borderTopWidth: 2,
    borderBottomWidth:2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
function buttonPressHandler(login, username, password) {
  login (username, password);
}

let Login = React.createClass({

  render() {
    let loginButtonText = 'Log in';
    new AppAuthToken().deleteSessionToken();

    return(
    
        <MapView style={styles.map}
		    initialRegion={{
		      latitude: 37.78825,
		      longitude: -122.4324,
		      latitudeDelta: 0.0922,
		      longitudeDelta: 0.0421,
		    }}
  		/>
  		
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
