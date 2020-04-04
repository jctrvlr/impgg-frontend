import {
  changeLoginEmail,
  changePassword,
  updatePassword,
  updatePasswordSuccess,
  updatePasswordError,
  authUser,
  authUserSuccess,
  authUserError,
  resetState,
} from '../actions';
import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_PASSWORD,
  AUTH_USER,
  AUTH_USER_SUCCESS,
  AUTH_USER_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  RESET_STATE,
} from '../constants';

describe('ChangePasswordModal actions', () => {
  describe('changeLoginEmail', () => {
    it('should have type of CHANGE_LOGIN_EMAIL and pass loginEmail', () => {
      const fixture = 'email@email.com';

      const expected = {
        type: CHANGE_LOGIN_EMAIL,
        loginEmail: fixture,
      };
      expect(changeLoginEmail(fixture)).toEqual(expected);
    });
  });

  describe('changePassword', () => {
    it('should have type of CHANGE_PASSWORD and pass password', () => {
      const fixture = 'Hunter2';

      const expected = {
        type: CHANGE_PASSWORD,
        password: fixture,
      };
      expect(changePassword(fixture)).toEqual(expected);
    });
  });

  describe('updatePassword', () => {
    it('has a type of UPDATE_PASSWORD', () => {
      const expected = {
        type: UPDATE_PASSWORD,
      };
      expect(updatePassword()).toEqual(expected);
    });
  });

  describe('updatePasswordSuccess', () => {
    it('has a type of UPDATE_PASSWORD_SUCCESS', () => {
      const expected = {
        type: UPDATE_PASSWORD_SUCCESS,
      };
      expect(updatePasswordSuccess()).toEqual(expected);
    });
  });

  describe('updatePasswordError', () => {
    it('has a type of UPDATE_PASSWORD_ERROR', () => {
      const expected = {
        type: UPDATE_PASSWORD_ERROR,
      };
      expect(updatePasswordError()).toEqual(expected);
    });
  });

  describe('updatePasswordError', () => {
    it('has a type of UPDATE_PASSWORD_ERROR', () => {
      const expected = {
        type: UPDATE_PASSWORD_ERROR,
      };
      expect(updatePasswordError()).toEqual(expected);
    });
  });

  describe('authUser', () => {
    it('has a type of AUTH_USER', () => {
      const expected = {
        type: AUTH_USER,
      };
      expect(authUser()).toEqual(expected);
    });
  });

  describe('authUserSuccess', () => {
    it('has a type of AUTH_USER_SUCCESS', () => {
      const expected = {
        type: AUTH_USER_SUCCESS,
      };
      expect(authUserSuccess()).toEqual(expected);
    });
  });

  describe('authUserError', () => {
    it('should have type of AUTH_USER_ERROR and pass err', () => {
      const fixture = 'error';
      const expected = {
        type: AUTH_USER_ERROR,
        err: fixture,
      };
      expect(authUserError(fixture)).toEqual(expected);
    });
  });

  describe('resetState', () => {
    it('has a type of RESET_STATE', () => {
      const expected = {
        type: RESET_STATE,
      };
      expect(resetState()).toEqual(expected);
    });
  });
});
