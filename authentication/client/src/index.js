import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types';

import RequireAuth from './components/Authentication/RequireAuth';
import App from './components/app';
import Welcome from './components/Welcome';
import Signin from './components/Authentication/Signin';
import Signout from './components/Authentication/Signout';
import Signup from './components/Authentication/Signup';
import Feature from './components/Feature';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);

const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// If we have a token, consider the user loggedin.
if(token) {
  // Update the application state.
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory}>
  		<Route path='/' component={App}>
        <IndexRoute component={Welcome} />
        <Route path='/signin' component={Signin} />
        <Route path='/signout' component={Signout} />
        <Route path='/signup' component={Signup} />
        <Route path='/feature' component={RequireAuth(Feature)} />
      </Route>
   </Router>
  </Provider>
  , document.querySelector('.container'));
