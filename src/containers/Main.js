/**
 * # Main.js
 *  This is the main app screen
 *  
 */
'use strict';
/*
 * ## Imports
 *  
 * Imports from redux
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons'
/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';
import * as profileActions from '../reducers/profile/profileActions';

/**
 * Immutable
 */ 
import {Map} from 'immutable';

/**
 * Router
 */
import {Actions} from 'react-native-router-flux';

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header';

/**
 * The components needed from React
 */
import React, {Component} from 'react';
import
{
  StyleSheet,
  View,
ActivityIndicator,
Dimensions,
TextInput,
Text,
ListView,
TouchableHighlight,
Image
}
from 'react-native';


/**
 * The platform neutral button
 */
const  Button = require('apsl-react-native-button');
let deviceWidth = Dimensions.get('window').width


/**
 * Support for Hot reload
 * 
 */
const actions = [
  authActions,
  globalActions,
  profileActions,
];

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps(state) {
  return {
      ...state
  }
};

/*
 * Bind all the functions from the ```actions``` and bind them with
 * ```dispatch```

 */
function mapDispatchToProps(dispatch) {

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
  container: {
    flexDirection: 'column',
    flex: 1    
  },
   search: {
    width: 30,
    marginTop: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#006bb4',
    borderColor:  '#006bb4',
    color:'#FFFFFF',
    marginLeft: 10,
    marginRight: 10    
  },
   textStyle: {
    color: 'white'
  },
  backIcon: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    width: 40
  },
   header: {
    flexDirection: 'row',
    width: deviceWidth,
    height: 50,
    backgroundColor: '#006bb4'
  },
   input: {
    height: 50,
    padding: 5,
    width: deviceWidth - 40,
    color: '#fff'
  },
   separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  listView: {
    backgroundColor: '#FFFFFF',
  },
   rightContainer: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 5
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 30,      
    marginBottom: 5,
  },
  name: {
    fontSize: 15,
    marginBottom: 4,
    textAlign: 'center',
  },
   tableCell: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
  },
   login: {
    textAlign: 'center',
  },
   photo: {
    height: 40,
    width: 40,
    marginTop: 5,
    borderRadius: 20,
  }
});

/**
 * ## App class
 */
class Main extends Component {

  
   componentWillMount() {
    this.props.actions.getEmployeeCache();
    //dispatch(fetchSongsIfNeeded(playlist))
  } 
  
  handlePress() {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    });
  }
  


  render() {
    let spinner = <Text> </Text>;
    if ( this.props.profile.form.isFetching ) {
      spinner = <ActivityIndicator
                  animating={true}
                  style={[styles.left, {height: 50}]}
                  size="small"
                  />
    }

   let  textOnButton= 'Results Count = ';

    

    
          
          



    return(
      <View style={styles.container}>
        <View>
       
         <View style={styles.header}>         
          <Icon name="search" style={styles.search} size={30} color="#FFF" />
          <TextInput
           style={styles.input}
          onChangeText={this.props.actions.searchTermChanged}
          //placeholder={this.props.profile.form.searchTerm}    
            //placeholder={'Search Employees'}
            placeholderTextColor={'#E2E2E2'}
            underlineColorAndroid={'#3a3f41'}
          //  onSubmitEditing={this.onSubmitEditing}
            autoFocus={true}
            autoCorrect={false}   
            value={this.props.profile.form.searchTerm}         
          />
        </View>
        {spinner}
         <ListView dataSource={this.props.profile.results}
             style={styles.listView}
           renderRow={(emp, sectionId, rowId) => {
            return (
            <TouchableHighlight >
              <View style={styles.tableCell}>
                  <Image source={{ uri: emp.picture}} style={styles.photo} />
                <View style={styles.rightContainer}>
                  <Text style={styles.name}>{emp.first_name + " " + emp.last_name}</Text>
                  <Text style={styles.login}>{"Login: " + emp.login}</Text>
                </View>
              </View>
            </TouchableHighlight>
            )
            }}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}


           /> 
    
        </View>
      </View>
    );
  }
};

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main);

