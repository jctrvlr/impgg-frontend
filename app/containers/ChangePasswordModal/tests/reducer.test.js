import produce from 'immer';
import changePasswordModalReducer from '../reducer';
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

/* eslint-disable default-case, no-param-reassign */
describe('changePasswordModalReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      loginEmail: '',
      password: '',
      loading: false,
      loginError: false,
      authSuccess: false,
      changeSuccess: false,
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(changePasswordModalReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeLoginEmail action correctly', () => {
    const fixture = 'user@email.com';
    const expectedResult = produce(state, draft => {
      draft.loginEmail = fixture;
    });

    expect(
      changePasswordModalReducer(state, changeLoginEmail(fixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the changePassword action correctly', () => {
    const fixture = 'Hunter2';
    const expectedResult = produce(state, draft => {
      draft.password = fixture;
    });

    expect(changePasswordModalReducer(state, changePassword(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the authUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.loginError = false;
    });

    expect(changePasswordModalReducer(state, authUser())).toEqual(
      expectedResult,
    );
  });

  it('should handle the authUserError action correctly', () => {
    const fixture = 'error';
    const expectedResult = produce(state, draft => {
      draft.password = '';
      draft.loginEmail = '';
      draft.loginError = fixture;
      draft.authSuccess = false;
      draft.loading = false;
    });

    expect(changePasswordModalReducer(state, authUserError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the authUserSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loginEmail = '';
      draft.password = '';
      draft.authSuccess = true;
      draft.loginError = false;
      draft.loading = false;
    });

    expect(changePasswordModalReducer(state, authUserSuccess())).toEqual(
      expectedResult,
    );
  });

  it('should handle the updatePassword action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.loginError = false;
      draft.changeSuccess = false;
    });

    expect(changePasswordModalReducer(state, updatePassword())).toEqual(
      expectedResult,
    );
  });

  it('should handle the updatePasswordError action correctly', () => {
    const fixture = 'error';
    const expectedResult = produce(state, draft => {
      draft.password = '';
      draft.loginEmail = '';
      draft.loginError = fixture;
      draft.authSuccess = false;
      draft.loading = false;
      draft.changeSuccess = false;
    });

    expect(
      changePasswordModalReducer(state, updatePasswordError(fixture)),
    ).toEqual(expectedResult);
  });

  it('should handle the updatePasswordSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loginEmail = '';
      draft.password = '';
      draft.authSuccess = false;
      draft.loginError = false;
      draft.loading = false;
      draft.changeSuccess = true;
    });

    expect(changePasswordModalReducer(state, updatePasswordSuccess())).toEqual(
      expectedResult,
    );
  });

  it('should handle the resetState action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loginEmail = '';
      draft.password = '';
      draft.authSuccess = false;
      draft.loginError = false;
      draft.loading = false;
      draft.changeSuccess = false;
    });

    expect(changePasswordModalReducer(state, resetState())).toEqual(
      expectedResult,
    );
  });
});
