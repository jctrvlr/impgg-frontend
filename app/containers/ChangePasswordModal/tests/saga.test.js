/**
 * Test sagas
 */

import { put, all, takeLatest } from 'redux-saga/effects';

import { baseUrl } from 'vars';
import { AUTH_USER, UPDATE_PASSWORD } from '../constants';
import {
  authUserSuccess,
  authUserError,
  updatePasswordSuccess,
  updatePasswordError,
} from '../actions';
import changePasswordWatcher, { authUser, updatePassword } from '../saga';

const email = 'email@website.com';
const password = 'Hunter2';
const userData = {
  user: {
    firstName: 'John',
    lastName: 'Cummings',
  },
  token: {
    accessToken: '12345',
  },
};

/* eslint-disable redux-saga/yield-effects */
describe('authUser Saga', () => {
  let authUserGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    authUserGenerator = authUser();

    const selectEmailDescriptor = authUserGenerator.next().value;
    expect(selectEmailDescriptor).toMatchSnapshot();

    const selectPasswordDescriptor = authUserGenerator.next().value;
    expect(selectPasswordDescriptor).toMatchSnapshot();

    const selectUserDataDescriptor = authUserGenerator.next().value;
    expect(selectUserDataDescriptor).toMatchSnapshot();

    const callDescriptor = authUserGenerator.next({
      email,
      password,
      userData,
      baseUrl,
    }).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the authUserSuccess action if the user is authed successfully', () => {
    const response = { authenticated: true };
    const putDescriptor = authUserGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(authUserSuccess(response)));
  });

  it('should call the authUserError action if the response errors', () => {
    const response = new Error('Some error');

    const putDescriptor = authUserGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(authUserError(response)));
  });
});

describe('updatePassword Saga', () => {
  let updatePasswordGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    updatePasswordGenerator = updatePassword();

    const selectPasswordDescriptor = updatePasswordGenerator.next().value;
    expect(selectPasswordDescriptor).toMatchSnapshot();

    const selectUserDataDescriptor = updatePasswordGenerator.next().value;
    expect(selectUserDataDescriptor).toMatchSnapshot();

    const callDescriptor = updatePasswordGenerator.next({ password, userData })
      .value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the updatePasswordSuccess action if the user is authed successfully', () => {
    const response = { authenticated: true };
    const putDescriptor = updatePasswordGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(updatePasswordSuccess()));
  });

  it('should call the updatePasswordError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = updatePasswordGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(updatePasswordError(response)));
  });
});

describe('changePasswordWatcher Saga', () => {
  const changePasswordWatcherSaga = changePasswordWatcher();

  it('should start task to watch for AUTH_USER action and UPDATE_PASSWORD action', () => {
    const takeLatestDescriptor = changePasswordWatcherSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      all([
        takeLatest(AUTH_USER, authUser),
        takeLatest(UPDATE_PASSWORD, updatePassword),
      ]),
    );
  });
});
