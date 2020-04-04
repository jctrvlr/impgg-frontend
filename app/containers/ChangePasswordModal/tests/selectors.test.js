import {
  makeSelectLoginEmail,
  makeSelectLoading,
  makeSelectPassword,
  makeSelectLoginError,
  makeSelectAuthSuccess,
  makeSelectChangeSuccess,
} from '../selectors';
describe('ChangePasswordModal Selectors', () => {
  describe('makeSelectLoginEmail', () => {
    const selector = makeSelectLoginEmail();
    it('should select the loginEmail', () => {
      const loginEmail = 'user@email.com';
      const mockedState = {
        changePasswordModal: {
          loginEmail,
        },
      };
      expect(selector(mockedState)).toEqual(loginEmail);
    });
  });

  describe('makeSelectPassword', () => {
    const selector = makeSelectPassword();
    it('should select the password', () => {
      const password = 'Hunter2';
      const mockedState = {
        changePasswordModal: {
          password,
        },
      };
      expect(selector(mockedState)).toEqual(password);
    });
  });

  describe('makeSelectLoginError', () => {
    const selector = makeSelectLoginError();
    it('should select the loginError', () => {
      const loginError = 'error';
      const mockedState = {
        changePasswordModal: {
          loginError,
        },
      };
      expect(selector(mockedState)).toEqual(loginError);
    });
  });

  describe('makeSelectLoading', () => {
    const selector = makeSelectLoading();
    it('should select the loading', () => {
      const loading = false;
      const mockedState = {
        changePasswordModal: {
          loading,
        },
      };
      expect(selector(mockedState)).toEqual(loading);
    });
  });

  describe('makeSelectAuthSuccess', () => {
    const selector = makeSelectAuthSuccess();
    it('should select the authSuccess', () => {
      const authSuccess = false;
      const mockedState = {
        changePasswordModal: {
          authSuccess,
        },
      };
      expect(selector(mockedState)).toEqual(authSuccess);
    });
  });

  describe('makeSelectChangeSuccess', () => {
    const selector = makeSelectChangeSuccess();
    it('should select the changeSuccess', () => {
      const changeSuccess = false;
      const mockedState = {
        changePasswordModal: {
          changeSuccess,
        },
      };
      expect(selector(mockedState)).toEqual(changeSuccess);
    });
  });
});
