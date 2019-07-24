/*
 *
 * RegisterPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_FIRSTNAME,
  CHANGE_LASTNAME,
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  EMAIL_VALIDATION,
} from './constants';

export const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  loading: false,
  userData: false,
  error: false,
  emailValidation: false,
};

/* eslint-disable default-case, no-param-reassign */
const registerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_FIRSTNAME:
        draft.firstName = action.firstName;
        break;
      case CHANGE_LASTNAME:
        draft.lastName = action.lastName;
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

export default registerPageReducer;
