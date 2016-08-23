/**
 * # profileInitialState.js
 * 
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict';

const  {Record} = require('immutable'); 
import
{
ListView
}
from 'react-native';

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 *
 * The originalProfile is what Parse.com provided and has the objectId
 * The fields are what display on the UI
 */
const Form = Record({
  originalProfile: new(Record({
    username: null,
    email: null,
    objectId: null,
    emailVerified: null
  })),
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  searchTerm:'',
  searchEnabled:false,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    usernameErrorMsg: '',
    email: '',
    emailHasError: false,
    emailErrorMsg: '',
    emailVerified: false
  }))
});


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var res= ds.cloneWithRows( [] );

var InitialState = Record({
  form: new Form
  ,results:res
});

export default InitialState;
