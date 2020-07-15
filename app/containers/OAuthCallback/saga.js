/* eslint-disable no-underscore-dangle */
/**
 * logs in user
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import ReactGA from 'react-ga';
import { OAUTH_LOGIN } from 'containers/App/constants';
import Cookies from 'js-cookie';

import request from 'utils/request';
import moment from 'moment';

import {
  makeSelectService,
  makeSelectCode,
} from 'containers/OAuthCallback/selectors';

import { baseUrl } from 'vars';
import { oAuthLoginSuccess, oAuthLoginError } from '../App/actions';

/**
 * Authentication for user request/response handler
 */
export function* loginOauth() {
  // Select service and code from store
  const service = yield select(makeSelectService());
  const code = yield select(makeSelectCode());
  const requestOptions = {
    method: 'GET',
  };

  const requestURL = `${baseUrl}v1/auth/${service}/callback?code=${code}`;

  try {
    // Call our request helper (see 'utils/request')
    const ret = yield call(request, requestURL, requestOptions);

    ret.expires = moment
      .utc()
      .add(1, 'day')
      .toDate()
      .toUTCString();

    // Store user details and jwt token in local storage to keep user logged in between page refreshes
    Cookies.set('userData', JSON.stringify(ret), { secure: true });

    ReactGA.set({
      userId: ret.user._id,
    });

    yield put(oAuthLoginSuccess(ret, ret.user.email));
  } catch (err) {
    const jres = yield err.response.json();
    const authUserErrorMess = jres.message;
    yield put(oAuthLoginError(authUserErrorMess));
  }
}

/**
 * Root saga manages watcher lifecycle for authUser (login)
 */
export default function* authUserWatcher() {
  // Watches for AUTHENTICATE_USER actions and calls authUser when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(OAUTH_LOGIN, loginOauth);
}
