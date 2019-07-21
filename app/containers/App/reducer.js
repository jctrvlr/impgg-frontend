/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */
import produce from 'immer';
import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER,
  AUTHENTICATE_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGOUT_USER,
} from './constants';

// The initial state of the App TODO: CHANGE BACK TO FALSE AFTER TESTING
export const initialState = {
  loggedIn: true,
  loading: false,
  currentUser: false,
  userData: {
    picture:
      'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/20882321_10209659671756833_2624915717427776544_n.jpg?_nc_cat=106&_nc_oc=AQlTg4RvnZylFFN4II8sOl2YiGFUc6SsiXWovR3rAoAhvzxI-XaKqVa_kuY7yJxIrX-7tQChSa5AgRGH2frOtWbL&_nc_ht=scontent-iad3-1.xx&oh=bf5cfb05a363aa239f7a3f54069e4107&oe=5DAD765E',
    name: 'John Cummings',
  },
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTHENTICATE_USER:
        draft.loggedIn = false;
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case AUTHENTICATE_USER_SUCCESS:
        draft.loggedIn = true;
        draft.userData = action.userData;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case AUTHENTICATE_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case REGISTER_USER:
        draft.loggedIn = false;
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;

      case REGISTER_USER_SUCCESS:
        draft.loggedIn = true;
        draft.userData = action.userData;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case REGISTER_USER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case LOGOUT_USER:
        draft.loading = true;
        draft.error = false;
        draft.userData = false;
        break;
    }
  });

export default appReducer;
