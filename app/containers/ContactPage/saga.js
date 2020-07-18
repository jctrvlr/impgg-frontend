/**
 * Gets the repositories of the user from Github
 */

// import { push } from 'connected-react-router';
import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import request from 'utils/request';

import { baseUrl } from 'vars';
import { SEND_MESSAGE } from './constants';

import { sendMessageSuccess, sendMessageError } from './actions';
import {
  makeSelectEmail,
  makeSelectSubject,
  makeSelectMessage,
} from './selectors';

/**
 * Create domain request/response handler
 */
export function* sendMessageSaga() {
  // Select Domain and userData from store
  const email = yield select(makeSelectEmail());
  const subject = yield select(makeSelectSubject());
  const message = yield select(makeSelectMessage());

  let requestOptions = {};
  let requestURL = '';

  requestURL = `${baseUrl}v1/messages`;
  requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      subject,
      message,
    }),
  };

  try {
    // Call our request helper (see 'utils/request')
    // eslint-disable-next-line no-unused-vars
    const ret = yield call(request, requestURL, requestOptions);
    // Return success
    yield put(sendMessageSuccess());
  } catch (err) {
    yield put(sendMessageError(err));
  }
}

/**
 * Root saga manages watcher lifecycle for domain
 */
export default function* sendMessageWatcher() {
  yield all([takeLatest(SEND_MESSAGE, sendMessageSaga)]);
}
