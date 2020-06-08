/*
 *
 * SigninPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_EMAIL, CHANGE_PASSWORD, EMAIL_VALIDATION } from './constants';

export const initialState = {
  email: '',
  password: '',
  emailValidation: false,
};

/* eslint-disable default-case, no-param-reassign */
const signinPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
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
