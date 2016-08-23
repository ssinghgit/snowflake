/**
 * # globalActions.js
 * 
 * Actions that are global in nature
 */
'use strict';

/**
 * ## Imports
 * 
 * The actions supported
 */
const {
  SET_SESSION_TOKEN,
  SET_STORE,
  SET_STATE,
  GET_STATE,
  GLB_OPEN_DB,
  GLB_DB_SUCCESS
} = require('../../lib/constants').default;


//import SQLLite from 'react-native-sqlite-storage';

import {DB,SQL} from '../../Constants';
var SQLite = require('react-native-sqlite-storage') 



function errorCB(err) {
  console.log("SQL Error: " + err);
}

function successCB() {
  console.log("SQL executed fine");
}

function openCB() {
  console.log("Database OPENED from GlobalActions");
}


export function openDB() {
 return  dispatch =>{
 DB.dataconn = SQLite.openDatabase(DB.databaseName, "1.0", "MYBLK DB", 200000, openCB, errorCB);
  
  //dispatch(dbOpenSuccess(db));
 }
  

}
export function dbOpenSuccess(db){
  return {
    type: GLB_DB_SUCCESS,
    payload: db
  };
}   


/**
 * ## set the sessionToken
 *
 */
export function setSessionToken(sessionToken) {
  return {
    type: SET_SESSION_TOKEN,
    payload: sessionToken
  };
}
/**
 * ## set the store 
 * 
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
  return {
    type: SET_STORE,
    payload: store
  };
}
/**
 * ## set state
 * 
 */
export function setState(newState) {
  return {
    type: SET_STATE,
    payload: newState
  };
}
/**
 * ## getState
 *
 */
export function getState(toggle) {
  return {
    type: GET_STATE,
    payload: toggle
  };
}
