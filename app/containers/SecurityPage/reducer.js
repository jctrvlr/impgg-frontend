/*
 *
 * SecurityPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_EMAIL,
  EMAIL_VALIDATION,
  EDIT_EMAIL,
  EDIT_EMAIL_ERROR,
  EDIT_EMAIL_SUCCESS,
} from './constants';

export const initialState = {
  email: false,
  error: false,
  emailValidation: false,
};

/* eslint-disable default-case, no-param-reassign */
const securityPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        draft.error = false;
        break;
      case EMAIL_VALIDATION:
        draft.emailValidation = action.emailValidation;
        break;
      case EDIT_EMAIL:
        draft.error = false;
        break;
      case EDIT_EMAIL_SUCCESS:
        draft.error = false;
        draft.email = false;
        draft.emailValidation = false;
        break;
      case EDIT_EMAIL_ERROR:
        draft.error = action.err;
        draft.emailValidation = false;
        break;
    }
  });

export default securityPageReducer;
