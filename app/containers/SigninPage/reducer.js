/*
 *
 * SigninPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  EMAIL_VALIDATION,
} from './constants';

export const initialState = {
  email: '',
  password: '',
  loading: false,
  currentUser: false,
  userData: false,
  error: false,
  login_success: false,
};

/* eslint-disable default-case, no-param-reassign */
const signinPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case EMAIL_VALIDATION:
        draft.emailValidation = action.emailValidation;
        break;
    }
  });

export default signinPageReducer;
