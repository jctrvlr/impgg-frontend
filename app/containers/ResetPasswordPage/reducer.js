/*
 *
 * ResetPasswordPage reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_EMAIL,
  EMAIL_VALIDATION,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,
  CHANGE_TOK,
  CHANGE_PASSWORD,
} from './constants';

export const initialState = {
  email: '',
  emailValidation: false,
  resetPasswordMessage: '',
  loading: false,
  tok: false,
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_EMAIL:
        draft.email = action.email;
        break;

      case CHANGE_TOK:
        draft.tok = action.tok;
        break;

      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;

      case EMAIL_VALIDATION:
        draft.emailValidation = action.emailValidation;
        break;

      case RESET_PASSWORD:
        draft.loading = true;
        break;

      case RESET_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.resetPasswordMessage = action.msg;
        break;

      case RESET_PASSWORD_ERROR:
        draft.loading = false;
        draft.resetPasswordMessage = action.err;
        break;

      case SET_NEW_PASSWORD:
        draft.loading = true;
        draft.resetPasswordMessage = '';
        break;

      case SET_NEW_PASSWORD_SUCCESS:
        draft.loading = false;
        draft.resetPasswordMessage = action.msg;
        break;

      case SET_NEW_PASSWORD_ERROR:
        draft.loading = false;
        draft.resetPasswordMessage = action.err;
        break;
    }
  });

export default resetPasswordPageReducer;
