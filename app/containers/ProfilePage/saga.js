import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import request from 'utils/request';

import { baseUrl } from 'vars';
import { REMOVE_PROFILE_PICTURE, UPDATE_PROFILE_INFO } from './constants';

import {
  updateProfileInfoSuccess,
  updateProfileInfoError,
  removeProfilePictureSuccess,
  removeProfilePictureError,
} from './actions';

import { makeSelectFirstName, makeSelectLastName } from './selectors';

import { makeSelectUserData } from '../App/selectors';

/**
 * Remove Profile picture handler
 */
export function* removeProfilePicture() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/users/profile/picture`;
  requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);

    yield put(removeProfilePictureSuccess(ret));
  } catch (err) {
    const pictureError = yield err.response.json();
    yield put(removeProfilePictureError(pictureError));
  }
}

/**
 * Create link request/response handler
 */
export function* updateProfileInfo() {
  // Select userData from store
  const userData = yield select(makeSelectUserData());
  let firstName = yield select(makeSelectFirstName());
  let lastName = yield select(makeSelectLastName());

  if (!firstName) {
    firstName =
      (userData &&
        userData.user &&
        userData.user.profile &&
        userData.user.profile.firstName) ||
      '';
  }

  if (!lastName) {
    lastName =
      (userData &&
        userData.user &&
        userData.user.profile &&
        userData.user.profile.lastName) ||
      '';
  }

  const profile = {
    firstName,
    lastName,
  };

  // eslint-disable-next-line no-underscore-dangle
  const requestURL = `${baseUrl}v1/users/${userData.user._id}`;
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userData.token.accessToken}`,
    },
    body: JSON.stringify({ profile }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);

    const userDataR = JSON.parse(localStorage.getItem('userData'));
    userDataR.user = ret;

    localStorage.setItem('userData', JSON.stringify(userDataR));

    yield put(updateProfileInfoSuccess(userDataR));
  } catch (err) {
    yield put(updateProfileInfoError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for link
 */
export default function* profilePageWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(REMOVE_PROFILE_PICTURE, removeProfilePicture),
    takeLatest(UPDATE_PROFILE_INFO, updateProfileInfo),
  ]);
}
