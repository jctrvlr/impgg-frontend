/**
 * Test sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { AUTH_USER, UPDATE_PASSWORD } from '../constants';
import {
  authUserSuccess,
  authUserError,
  updatePasswordSuccess,
  updatePasswordError,
} from '../actions';
import changePasswordWatcher, { authUser, updatePassword } from '../saga';

const loginEmail = 'email@website.com';
const password = 'Hunter2';
const userData = {
  user: {
    firstName: 'John',
    lastName: 'Cummings',
  },
};

/* eslint-disable redux-saga/yield-effects */
describe('authUser Saga', () => {
  let authUserGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    authUserGenerator = authUser();

    const selectDescriptor = authUserGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = authUserGenerator.next(
      loginEmail,
      password,
      userData,
    ).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the reposLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First repo',
      },
      {
        name: 'Second repo',
      },
    ];
    const putDescriptor = getReposGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(reposLoaded(response, username)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getReposGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(repoLoadingError(response)));
  });
});

describe('githubDataSaga Saga', () => {
  const githubDataSaga = githubData();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = githubDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_REPOS, getRepos));
  });
});
