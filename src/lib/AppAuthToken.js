/**
 * # AppAuthToken.js
 * 
 * A thin wrapper over the react-native-simple-store
 *
 */
'use strict';

require('regenerator/runtime');
/**
 * ## Imports
 * 
 * Redux  & the config file
 */ 
import store from 'react-native-simple-store';
import CONFIG from './config';
const Keychain = require('react-native-keychain');
const Buffer = require('buffer').Buffer;
const APPDUMMYSERVER="http://myblackrockapp.com";
export default class AppAuthToken {
  /**
   * ## AppAuthToken
   *
   * set the key from the config
   */


   /**
 * ## Async support
 * 
 */ 



  constructor () {
    this.SESSION_TOKEN_KEY = "MYBLKKEY";
  }

  /**
   * ### storeSessionToken
   * Store the session key 
   */
  storeSessionToken(sessionToken) {
    return store.save(this.SESSION_TOKEN_KEY,{
      sessionToken: sessionToken
    });

  }

   saveValue(value) {
    let val =  store.get(this.SESSION_TOKEN_KEY).then(
     val => {     
     if (val) 
        store.update(this.SESSION_TOKEN_KEY,value)
      else 
        store.save(this.SESSION_TOKEN_KEY,value)
    })

    
    } 


   getValue() {

    return store.get(this.SESSION_TOKEN_KEY);
  } 
  


  getKC() {
    return Keychain.getInternetCredentials(APPDUMMYSERVER);
  }

  setKC(username,password) {
     console.log("coming here "  + username + " with pw = " + password) 
     return Keychain
      .setInternetCredentials(username, password,APPDUMMYSERVER);
  }

 

    getBaseAuthHeader(username,password) {
    
    let basicVal= 'Basic ' + new Buffer(username+":" +password).toString('base64');
    return basicVal;  
    

}

  
  getSessionToken(sessionToken) {
    if (sessionToken) {
      return store.save(this.SESSION_TOKEN_KEY,{
          sessionToken: sessionToken
      }).then(() => {
        return store.get(this.SESSION_TOKEN_KEY);
      });
    }
    return store.get(this.SESSION_TOKEN_KEY);
  }
  /**
   * ### deleteSessionToken
   * Deleted during log out
   */
  deleteSessionToken() {
    return store.delete(this.SESSION_TOKEN_KEY);
  }

  
}

