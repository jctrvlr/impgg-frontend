import {
  changeEmail,
  changeTok,
  changePassword,
  validateEmail,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordError,
  setNewPassword,
  setNewPasswordSuccess,
  setNewPasswordError,
} from '../actions';
import {
  CHANGE_EMAIL,
  EMAIL_VALIDATION,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  CHANGE_TOK,
  CHANGE_PASSWORD,
  SET_NEW_PASSWORD,
  SET_NEW_PASSWORD_SUCCESS,
  SET_NEW_PASSWORD_ERROR,
} from '../constants';

describe('ResetPasswordPage actions', () => {
  describe('CHANGE_EMAIL Action', () => {
    it('has a type of CHANGE_EMAIL', () => {
      const expected = {
        type: CHANGE_EMAIL,
        email: 'email',
      };
      expect(changeEmail('email')).toEqual(expected);
    });
  });

  describe('CHANGE_TOK Action', () => {
    it('has a type of CHANGE_TOK', () => {
      const expected = {
        type: CHANGE_TOK,
        tok: 'token123',
      };
      expect(changeTok('token123')).toEqual(expected);
    });
  });

  describe('CHANGE_PASSWORD Action', () => {
    it('has a type of CHANGE_PASSWORD', () => {
      const expected = {
        type: CHANGE_PASSWORD,
        password: 'password123',
      };
      expect(changePassword('password123')).toEqual(expected);
    });
  });

  describe('SET_NEW_PASSWORD Action', () => {
    it('has a type of SET_NEW_PASSWORD', () => {
      const expected = {
        type: SET_NEW_PASSWORD,
      };
      expect(setNewPassword()).toEqual(expected);
    });
  });

  describe('SET_NEW_PASSWORD_SUCCESS Action', () => {
    it('has a type of SET_NEW_PASSWORD_SUCCESS and returns msg', () => {
      const expected = {
        type: SET_NEW_PASSWORD_SUCCESS,
        msg: 'Message from server',
      };
      expect(setNewPasswordSuccess('Message from server')).toEqual(expected);
    });
  });

  describe('SET_NEW_PASSWORD_ERROR Action', () => {
    it('has a type of SET_NEW_PASSWORD_ERROR and returns err', () => {
      const expected = {
        type: SET_NEW_PASSWORD_ERROR,
        err: 'Error setting new password',
      };
      expect(setNewPasswordError('Error setting new password')).toEqual(
        expected,
      );
    });
  });

  describe('RESET_PASSWORD Action', () => {
    it('has a type of RESET_PASSWORD', () => {
      const expected = {
        type: RESET_PASSWORD,
      };
      expect(resetPassword()).toEqual(expected);
    });
  });

  describe('RESET_PASSWORD_SUCCESS Action', () => {
    it('has a type of RESET_PASSWORD_SUCCESS and returns msg', () => {
      const expected = {
        type: RESET_PASSWORD_SUCCESS,
        msg: 'Message from server',
      };
      expect(resetPasswordSuccess('Message from server')).toEqual(expected);
    });
  });

  describe('RESET_PASSWORD_ERROR Action', () => {
    it('has a type of RESET_PASSWORD_ERROR and returns err', () => {
      const expected = {
        type: RESET_PASSWORD_ERROR,
        err: 'Error reseting password',
      };
      expect(resetPasswordError('Error reseting password')).toEqual(expected);
    });
  });

  describe('EMAIL_VALIDATION Action', () => {
    it('returns type EMAIL_VALIDATION and false if email is valid', () => {
      const expected = {
        type: EMAIL_VALIDATION,
        emailValidation: false,
      };
      expect(validateEmail('jcummings5@gmail.com')).toEqual(expected);
    });

    it('returns type EMAIL_VALIDATION and message if email is invalid', () => {
      const expected = {
        type: EMAIL_VALIDATION,
        emailValidation: 'Enter a valid email',
      };
      expect(validateEmail('invalidemail.com')).toEqual(expected);
    });
  });
});
