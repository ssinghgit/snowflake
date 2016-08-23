'use strict';
/**
 *  # snowflake
 *  Snowflake ![snowflake](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
  Router,
  Scene,
  TabBar} from 'react-native-router-flux';

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider,
  connect } from 'react-redux';

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore';


/**
 * ### containers
 *
 * All the top level containers
 *
 */
import App from './containers/App';
import Login from './containers/Login';
import Map from './containers/Map';
import Logout from './containers/Logout';
import Register from './containers/Register';
import ForgotPassword from './containers/ForgotPassword';
import Profile from './containers/Profile';
import Main from './containers/Main';
import Subview from './containers/Subview';

/** 
 * ### icons
 *
 * Add icon support for use in Tabbar
 * 
 */
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions';
import {setStore,openDB} from './reducers/global/globalActions';

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import authInitialState from './reducers/auth/authInitialState';
import deviceInitialState from './reducers/device/deviceInitialState';
import globalInitialState from './reducers/global/globalInitialState';
import profileInitialState from './reducers/profile/profileInitialState';

/**
 *  The version of the app but not  displayed yet
 */
import pack from '../package';
var VERSION=pack.version;
let deviceWidth = Dimensions.get('window').width
console.disableYellowBox = true;
/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  const _initState = {
    auth: new authInitialState,
    device: (new deviceInitialState).set('isMobile',true),
    global: (new globalInitialState),
    profile: new profileInitialState
  };
  return _initState;
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
   tabbar: {
    flexDirection: 'row',
    width: deviceWidth,
    height: 50,
    backgroundColor: '#006bb4'
  },
  tabbar2:{
    backgroundColor:'#006bb4' 
  }
});

/**
 * ## TabIcon 
 * 
 * Displays the icon for the tab w/ color dependent upon selection
 */

class TabIcon extends React.Component {
  render(){
    var color = this.props.selected ? '#006bb4' : '#4F8DB8';
    return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={30} />
        <Text style={{color: color}}>{this.props.title}</Text>
        </View>
    );
  }
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {

  let Snowflake = React.createClass( {
    render() {
      
      const store = configureStore(getInitialState());
      
      // configureStore will combine reducers from snowflake and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform));
      store.dispatch(setVersion(VERSION));
      store.dispatch(setStore(store));
      store.dispatch(openDB());  
      
      // setup the router table with App selected as the initial component
      // note: See https://github.com/aksonov/react-native-router-flux/issues/948 
      return (
        <Provider store={store}>

	  <Router sceneStyle={{ backgroundColor: 'white' }}>    
	    <Scene key="root"
                   hideNavBar={true}>
              
              <Scene key="App"
                     component={App}
                     title="App"
                     type="replace"
                     initial={true}/>
              
	      <Scene key="InitialLoginForm"
                     component={Register}
                     title="Register"
                     type="replace"
                     />
              
              <Scene key="Login"
                     component={Login}
                     title="Login" 
                     type="replace"/>
	      
	     

	      <Scene key="Tabbar"
                     tabs={true}
                     hideNavBar={true}
                     tabBarStyle={ styles.tabBar }
                     default="Main">
        
                
	        <Scene key="Main"
                       title="Home"
                       iconName={"home"}
                       icon={TabIcon}                       
                       hideNavBar={true}
                       component={Main}
                       initial={true}/>

          <Scene key="Logout"
                       title="Offices"
                       icon={TabIcon}
                       iconName={"map"}
                       hideNavBar={true}
                       component={Map}/>            

                <Scene key="Settings"
                       title="Settings"
                       icon={TabIcon}                       
                       iconName={"gear"}
                       hideNavBar={true}
                       component={Profile}/>
	      </Scene>
	    </Scene> 
	  </Router>
   
        </Provider>
      );
    }
  });
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('MyBLK', () => Snowflake);
}
