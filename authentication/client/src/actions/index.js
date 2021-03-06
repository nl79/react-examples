const ROOT_URL = 'http://localhost:3090/';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
} from './types';

import axios from 'axios';
import { browserHistory } from 'react-router';

export function signinUser({email, password}) {
  return function(dispatch) {
    // Submit email/password to the server.
    axios.post(`${ROOT_URL}signin`, {email, password})
      .then((response) => {
        // If Request is good
        // -- update state to indicate user is authenticated.
        dispatch({type: AUTH_USER});
        // -- save the JWT Token.
        localStorage.setItem('token', response.data.token);
        // -- Redirect to the route '/feature'.
        browserHistory.push('/feature');

      })
      .catch((err) => {
        // If request is bad
        // -- show error to the user.
        dispatch(authenticationError('Bad Login Info'));
      });
  }
}

export function authenticationError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {type: UNAUTH_USER}
}

export function signupUser({email, password}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}signup`, {email, password})
    .then((response) => {
      // -- update state to indicate user is authenticated.
      dispatch({type: AUTH_USER});
      // -- save the JWT Token.
      localStorage.setItem('token', response.data.token);
      // -- Redirect to the route '/feature'.
      browserHistory.push('/feature');
    })
    .catch((err) => {
      console.log('err', {...err});
      dispatch(authenticationError(err.response.data.error));
    });
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    }).then((response) => {
      console.log('response', response);
      dispatch({type: FETCH_MESSAGE, payload: response.data.message})
    }).catch((err) => {
      console.log('err', {...err});
    })
  }
}
