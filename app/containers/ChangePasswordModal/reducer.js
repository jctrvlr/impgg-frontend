/*
 *
 * ChangePasswordModal reducer
 *
 */
import produce from 'immer';
import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_PASSWORD,
  AUTH_USER,
  AUTH_USER_ERROR,
  AUTH_USER_SUCCESS,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  RESET_STATE,
} from './constants';

export const initialState = {
  loginEmail: '',
  password: '',
  loading: false,
  loginError: false,
  authSuccess: false,
  changeSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordModalReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_LOGIN_EMAIL:
        draft.loginEmail = action.loginEmail;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case AUTH_USER:
        draft.loading = true;
        draft.loginError = false;
        break;
      case AUTH_USER_ERROR:
        draft.password = '';
        draft.loginEmail = '';
        draft.loginError = action.err;
        draft.authSuccess = false;
        draft.loading = false;
        break;
      case AUTH_USER_SUCCESS:
        draft.loginEmail = '';
        draft.password = '';
        draft.authSuccess = true;
        draft.loginError = false;
        draft.loading = false;
        break;
      case UPDATE_PASSWORD:
        draft.loading = true;
        draft.loginError = false;
        draft.changeSuccess = false;
        break;
      case UPDATE_PASSWORD_ERROR:
        draft.password = '';
        draft.loginEmail = '';
        draft.loginError = action.err;
        draft.authSuccess = false;
        draft.loading = false;
        draft.changeSuccess = false;
        break;
      case UPDATE_PASSWORD_SUCCESS:
        draft.loginEmail = '';
        draft.password = '';
        draft.authSuccess = false;
        draft.loginError = false;
        draft.loading = false;
        draft.changeSuccess = true;
        break;
      case RESET_STATE:
        draft.loginEmail = '';
        draft.password = '';
        draft.authSuccess = false;
        draft.loginError = false;
        draft.loading = false;
        draft.changeSuccess = false;
    }
  });

export default changePasswordModalReducer;
