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
    it('should select the loginEmail', () => {
      const changePasswordState = {
        loginEmail: 'user@email.com',
      };
      const mockedState = {
        changePasswordState,
      };
      expect(makeSelectLoginEmail()(mockedState)).toEqual(
        changePasswordState.loginEmail,
      );
    });
  });

  describe('makeSelectPassword', () => {
    it('should select loading', () => {
      const changePasswordState = {
        password: 'Hunter2',
      };
      const mockedState = {
        changePasswordState,
      };
      expect(makeSelectPassword()(mockedState)).toEqual(
        changePasswordState.password,
      );
    });
  });

  describe('makeSelectLoginError', () => {
    it('should select loginError', () => {
      const changePasswordState = {
        loginError: 'error',
      };
      const mockedState = {
        changePasswordState,
      };
      expect(makeSelectLoginError()(mockedState)).toEqual(
        changePasswordState.loginError,
      );
    });
  });

  describe('makeSelectLoading', () => {
    it('should select loading', () => {
      const changePasswordState = {
        loading: false,
      };
      const mockedState = {
        changePasswordState,
      };
      expect(makeSelectLoading()(mockedState)).toEqual(
        changePasswordState.loading,
      );
    });
  });

  describe('makeSelectAuthSuccess', () => {
    it('should select userData', () => {
      const changePasswordState = {
        authSuccess: false,
      };
      const mockedState = {
        changePasswordState,
      };
      expect(makeSelectAuthSuccess()(mockedState)).toEqual(
        changePasswordState.authSuccess,
      );
    });
  });

  describe('makeSelectChangeSuccess', () => {
    it('should select userData', () => {
      const changePasswordState = {
        changeSuccess: false,
      };
      const mockedState = {
        changePasswordState,
      };
      expect(makeSelectChangeSuccess()(mockedState)).toEqual(
        changePasswordState.changeSuccess,
      );
    });
  });
});
