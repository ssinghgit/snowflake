/**
 * # profileActions.js
 * 
 * The actions to support the users profile
 */
'use strict';
/**
 * ## Imports
 * 
 * The actions for profile
 */
 
const {
  FETCH_EMPCACHE,
  EMPCACHE_FETCHED,
  SEARCHTERM_CHANGED,
  SEARCH_EMP_REQUEST,
  SEARCH_EMP_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE
} = require('../../lib/constants').default;

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access 
 */
const BackendFactory = require('../../lib/BackendFactory').default;
const AppAuthToken = require('../../lib/AppAuthToken').default;

const EMPLOYEE_CACHE_SERVICE ="/employeecache";

//var SQLite = require('react-native-sqlite-storage') ;

//import SQLLite from 'react-native-sqlite-storage';

import {DB,SQL} from '../../Constants';



/**
 * ## retreiving profile actions
 */
export function getProfileRequest() {
  return {
    type: GET_PROFILE_REQUEST
  };
}
export function getProfileSuccess(json) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: json
  };
}
export function getProfileFailure(json) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: json
  };
}



function sendChangeTextAction(text) {
   
   return {
    type:SEARCHTERM_CHANGED,
    payload:text
   };
}

function sendStartEmpSearchAction(text) {
   
   return {
    type:SEARCH_EMP_REQUEST,
    payload:text
   };
}

function sendEmployeeResultSuccess(data) {
  console.log("coming here to dispatch data ")
   return {
    type:SEARCH_EMP_SUCCESS,
    payload:data
   };
}


function getSQL(t) {
  let text= t.toLowerCase();
    let textArray = text.split(" ");
          let qry="";
   
         if(textArray.length == 1){
           return 'SELECT * FROM Employees a WHERE lower(a.fn) like "'+text+'%" OR lower(a.ln) like "'+text+'%" OR lower(a.lg) like "'+text+'%" LIMIT 7';
          }else{
            let fName = textArray[0];
            let lName = textArray[1];     
           return 'SELECT * FROM Employees a WHERE (lower(a.fn) like "'+fName+'%" AND lower(a.ln) like "'+lName+'%") OR (lower(a.fn) like "'+lName+'%" AND lower(a.ln) like "'+fName+'%") LIMIT 7';
          }  

}



export function searchTermChanged(text) {
   
   return dispatch=> { 
      dispatch( sendChangeTextAction(text)  );
      if ( text && text.length > 2) {
        dispatch(sendStartEmpSearchAction(text) );

        
          let qry = getSQL(text)
          console.log(qry);

            DB.dataconn.executeSql(qry, [], function(rs) {
                console.log( rs.rows);
              let len=rs.rows.length;
              let employeeDataArray=[];
              for (let i = 0; i < len; i++) {
                  let row = rs.rows.item(i);
                  
                  
                  let employeeData = {};
 
                  employeeData['first_name'] = row.fn;
                  employeeData['last_name'] = row.ln;
                  employeeData['login'] = row.lg;
                  //employeeData['image'] = require("../images/default-user-icon.png");
                  employeeData['title'] = row.tt;
                  employeeData['orgName'] = row.og;
                  employeeData['email'] = row.em;
                  employeeData['picture']='https://randomuser.me/api/portraits/men/47.jpg';
                  
 
                  employeeDataArray.push(employeeData);

                }  
                console.log("Ready to dispatch array of " + employeeDataArray[2])
                dispatch(sendEmployeeResultSuccess(employeeDataArray)); 
      }, function(error) {
              console.log('SELECT SQL statement ERROR: ' + error.message);
      }
      );

        /*  DB.dataconn.transaction((tx) => {
   
              tx.executeSql(qry).then(([tx,results]) => {
   
                var len = results.rows.length;
   
                console.log("length = " + len)

              }).catch(error => {

              })
            });
            */

      } 
   
 } 

}

export function employeeCacheFetchRequest() {
   return {
    type:FETCH_EMPCACHE};
  
}

export function employeeCacheFetchComplete() {
   return {
    type:EMPCACHE_FETCHED};
  
}

export function getEmployeeCache() {
  let appToken = new AppAuthToken()
  let basicVal=""
  return dispatch => {
    dispatch(employeeCacheFetchRequest())
      appToken.getValue().then( val=> { 
          //console.log(val)
          basicVal=  new AppAuthToken().getBaseAuthHeader(val.username,val.password);
          if ( DB.PREFIX == null ) 
              DB.PREFIX = val.prefix;
            if ( DB.PREFIX == null ) 
                DB.PREFIX= "http://home-pc:8080/"
          if ( val && val.rowcount)  {
           console.log("No need to fetch anything for now");
            dispatch(employeeCacheFetchComplete())
          }
      // });
       else { 
         
         

      //appToken.getKC()
    //  .then(function(credentials) {
//        let basicVal=   new AppAuthToken().getBaseAuthHeader(credentials.username,credentials.password);
        fetch(DB.PREFIX+EMPLOYEE_CACHE_SERVICE, {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Authorization': basicVal
        }
  }
) .then((response) => response.json() )
  .then ( responseData =>{
      //createSqlliteStorage(responseData);
      console.log("respoonse Data " + DB.dataconn);
      
      //let insertsqlArr=[];
      let insertsqlArr=responseData.map( element => 
          'INSERT OR REPLACE INTO Employees(en, fn, ln, og, tt, lg, em, ts) VALUES ("'+element.en+'", "'+element.fn+'", "'+element.ln+'", "'+element.og+'", "'+element.tt+'", "'+element.lg+'", "'+element.em+'" , "'+element.ts+'")'
      );
      let arr= [ SQL.createEmployeeTable,SQL.deleteAll,...insertsqlArr];      
      DB.dataconn.sqlBatch(arr,
        function() { 
          //Successful Insert of Data
          console.log("successful insert of data" )
           DB.dataconn.executeSql(SQL.selectMaxTimestamp, [], function(rs) {
          
            let stats =  {"maxts" :  rs.rows.item(0).mts , "rowcount": rs.rows.item(0).counter };
            try {            
            appToken.saveValue( stats);  
                dispatch(employeeCacheFetchComplete())
           } catch (e ) {  
             console.log(e);
          }

           // AsyncStorage.setItem('@MyBlackRock:maxTimestamp', maxTs.toString());
          }, function(error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
          })

        }
        ,function (err) { console.log("error=" +err.message) }
        ) ;


      

  } )  ;

  //  })      // End of Keychain stuff

     }
   }); // End store GET 
  };
}



/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getProfile(sessionToken) {
  return dispatch => {

    dispatch(getProfileRequest());
    //store or get a sessionToken
    return new AppAuthToken().getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).getProfile();
      })
      .then((json) => {
          dispatch(getProfileSuccess(json));
      })
      .catch((error) => {
        dispatch(getProfileFailure(error));
      });
  };
}
/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function profileUpdateRequest() {
  return {
    type: PROFILE_UPDATE_REQUEST
  };
}
export function profileUpdateSuccess() {
  return {
    type: PROFILE_UPDATE_SUCCESS
  };
}
export function profileUpdateFailure(json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  };
}
/**
 * ## updateProfile
 * @param {string} userId -  objectId 
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} sessionToken - the sessionToken from Parse.com
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, Parse.com is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on Parse.com
 *
 */
export function updateProfile(userId, username, email, sessionToken) {
  return dispatch => {
    dispatch(profileUpdateRequest());
    return new AppAuthToken().getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).updateProfile(userId,
          {
            username: username,
            email: email
          }
        );
      })
      .then(() => {
          dispatch(profileUpdateSuccess());
          dispatch(getProfile());
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error));
      });
  };
}
/**
 * ## onProfileFormFieldChange
 * 
 */
export function onProfileFormFieldChange(field,value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  };
}
