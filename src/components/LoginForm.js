/**
 * # LoginForm.js
 * 
 * This class utilizes the ```tcomb-form-native``` library and just
 * sets up the options required for the 3 states of Login, namely
 * Login, Register or Reset Password
 *
 */
'use strict';
/**
 * ## Import
 *
 * React
 */
import React, {PropTypes} from 'react';

/** 
 * States of login display
 */
const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../lib/constants').default;

/**
 *  The fantastic little form library
 */
const t = require('tcomb-form-native');
let Form = t.form.Form;

var LoginForm = React.createClass({
  /**
   * ## LoginForm class
   *
   * * form: the properties to set into the UI form
   * * value: the values to set in the input fields
   * * onChange: function to call when user enters text
   */
  propTypes: {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },

  /**
   * ## render
   *
   * setup all the fields using the props and default messages
   * 
   */
  render() {

    let formType = this.props.formType;
    
    let options = {
      auto: 'placeholders',
      fields: {
        
      }
    };

    let username = {
      label: 'Username',
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: this.props.form.fields.usernameErrorMsg
    };

    let serverurl= {
      label: 'Server URL',
   //   secureTextEntry: secureTextEntry,
      maxLength: 100,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg
    };
    
    
    let email = {
      label: 'Email',
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg
    };

    let secureTextEntry = !this.props.form.fields.showPassword;

    let password = {
      label: 'Password',
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg
    };

    let passwordAgain= {
      label: 'Server URL',
   //   secureTextEntry: secureTextEntry,
      maxLength: 100,
      editable: !this.props.form.isFetching
    };

    let loginForm;
    switch(formType) {
      /**
       * ### Registration
       * The registration form has 4 fields
       */
    case(REGISTER):
      loginForm = t.struct({
        username: t.String,
        email: t.String,
        password: t.String,
        passwordAgain: t.String
      });
      options.fields['username'] = username;
      options.fields['username'].autoCapitalize = 'none';
      options.fields['email'] = email;
      options.fields['email'].autoCapitalize = 'none';
      options.fields['password'] = password;
      options.fields['passwordAgain'] = passwordAgain;
      break;

      /**
       * ### Login
       * The login form has only 2 fields
       */
    case(LOGIN):
      loginForm = t.struct({
        username: t.String,
        password: t.String,
        passwordAgain: t.String

        //,serverurl:t.string
      });
      options.fields['username'] = username;
      options.fields['username'].autoCapitalize = 'none';
      options.fields['password'] = password;
       options.fields['passwordAgain'] = passwordAgain;
      //options.fields['serverurl'] = serverurl;
      break;
      
      /**
       * ### Reset password
       * The password reset form has only 1 field
       */
    case(FORGOT_PASSWORD):
      loginForm = t.struct({
        email: t.String
      });
      options.fields['email'] = email;
      options.fields['email'].autoCapitalize = 'none';
      break;
    } //switch

    /**
     * ### Return
     * returns the Form component with the correct structures
     */
    return (
      <Form ref="form"
            type={loginForm}
            options={options}
            value={this.props.value}
            onChange={this.props.onChange}
      />

    );
  }
});

module.exports = LoginForm;

