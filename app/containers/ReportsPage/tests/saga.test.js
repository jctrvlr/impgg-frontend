/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */

// eslint-disable-next-line no-unused-vars
import { takeLatest, call, put, select, all } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import request from 'utils/request';

import { GET_CLICK_REPORT, GET_USERS_LINKS } from '../constants';
import reportsPageSaga, { getClickReport, getUsersLinks } from '../saga';
import { makeSelectUserData } from '../../App/selectors';
import { makeSelectClickCount, makeSelectClickLinkFilter } from '../selectors';

import {
  getClickReportSuccess,
  getClickReportError,
  getUsersLinkSuccess,
  getUsersLinkError,
} from '../actions';

describe('Reports Sagas', () => {
  describe('getClickReport Saga', () => {
    const watcherGenerator = reportsPageSaga();

    test('should wait for every GET_CLICK_REPORT action and call getClickReport', () => {
      expect(watcherGenerator.next().value).toEqual(
        all([
          takeLatest(GET_CLICK_REPORT, getClickReport),
          takeLatest(GET_USERS_LINKS, getUsersLinks),
        ]),
      );
    });

    test('should be done on next iteration', () => {
      expect(watcherGenerator.next().done).toBeTruthy();
    });

    test('should call api and dispatch success action "getClickReportSuccess" with result from clickreport endpoint', async () => {
      const mockResponse = { message: 'Request received.' };
      const userData = {
        token: {
          tokenType: 'Bearer',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM3MDM0NzcsImlhdCI6MTU5MzYxNzA3Nywic3ViIjoiNWU3MmExNmVmY2M2YjgxMTVlZTk1Njc1In0.Awi5gUc3IuJ0G0jgj5O2qhO5AW5ra_IdRGp_oy9kJAg',
          refreshToken:
            '5e72a16efcc6b8115ee95675.9bc9a98396d2eef2b787f25c235eee8e56bafaaa477fd72e1bdf211614d3811d487287509811ae45',
          expiresIn: '2020-07-02T15:24:37.294Z',
        },
        user: {
          profile: { firstName: 'John', lastName: 'Cummings' },
          preferences: { primaryDomain: 'imp.gg' },
          subscription: { startTimestamp: '2020-03-18T22:32:14.087Z' },
          domains: [
            {
              status: 2,
              validated: true,
              archived: false,
              _id: '5e72a165fcc6b8115ee95674',
              uri: 'imp.gg',
              domainType: 'dom',
              archiveEvents: [],
              createdAt: '2020-03-18T22:32:05.162Z',
              updatedAt: '2020-03-18T22:32:05.162Z',
              __v: 0,
            },
            {
              status: 1,
              validated: false,
              archived: false,
              _id: '5e82797e17423f565bb3eafc',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.isitdone.com',
              archiveEvents: [],
              createdAt: '2020-03-30T22:58:06.467Z',
              updatedAt: '2020-03-30T22:58:06.467Z',
              __v: 0,
            },
            {
              status: 2,
              validated: false,
              archived: false,
              _id: '5e8a48b370b8d6414e1ec02f',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.jackc.io',
              archiveEvents: [],
              createdAt: '2020-04-05T21:08:03.855Z',
              updatedAt: '2020-04-05T21:08:38.889Z',
              __v: 0,
            },
          ],
          tokens: [],
          role: 'user',
          _id: '5e72a16efcc6b8115ee95675',
          email: 'jcummings5@gmail.com',
          password:
            '$2a$10$cM5q9sBIb.w1Rjd2G5UNMOIhl4sWBPi/uZ1lPb.XOpoSDw2ffuU0m',
          createdAt: '2020-03-18T22:32:14.104Z',
          updatedAt: '2020-06-08T02:46:52.602Z',
          __v: 17,
        },
        expires: 'Thu, 02 Jul 2020 15:24:37 GMT',
      };
      const count = 100;
      const linkFilter = ['123', '1234'];

      return expectSaga(getClickReport)
        .provide([
          // Use the `select` effect creator from Redux Saga to match
          [select(makeSelectUserData), userData],
          [select(makeSelectClickCount), count],
          [select(makeSelectClickLinkFilter), linkFilter],

          // Use the `call.fn` matcher from Redux Saga Test Plan
          [matchers.call.fn(request), mockResponse],
        ])
        .put(getClickReportSuccess(mockResponse))
        .run();
    });

    test('should call api and dispatch error action "getClickReportError" with error from clickreport endpoint', async () => {
      const userData = {
        token: {
          tokenType: 'Bearer',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM3MDM0NzcsImlhdCI6MTU5MzYxNzA3Nywic3ViIjoiNWU3MmExNmVmY2M2YjgxMTVlZTk1Njc1In0.Awi5gUc3IuJ0G0jgj5O2qhO5AW5ra_IdRGp_oy9kJAg',
          refreshToken:
            '5e72a16efcc6b8115ee95675.9bc9a98396d2eef2b787f25c235eee8e56bafaaa477fd72e1bdf211614d3811d487287509811ae45',
          expiresIn: '2020-07-02T15:24:37.294Z',
        },
        user: {
          profile: { firstName: 'John', lastName: 'Cummings' },
          preferences: { primaryDomain: 'imp.gg' },
          subscription: { startTimestamp: '2020-03-18T22:32:14.087Z' },
          domains: [
            {
              status: 2,
              validated: true,
              archived: false,
              _id: '5e72a165fcc6b8115ee95674',
              uri: 'imp.gg',
              domainType: 'dom',
              archiveEvents: [],
              createdAt: '2020-03-18T22:32:05.162Z',
              updatedAt: '2020-03-18T22:32:05.162Z',
              __v: 0,
            },
            {
              status: 1,
              validated: false,
              archived: false,
              _id: '5e82797e17423f565bb3eafc',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.isitdone.com',
              archiveEvents: [],
              createdAt: '2020-03-30T22:58:06.467Z',
              updatedAt: '2020-03-30T22:58:06.467Z',
              __v: 0,
            },
            {
              status: 2,
              validated: false,
              archived: false,
              _id: '5e8a48b370b8d6414e1ec02f',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.jackc.io',
              archiveEvents: [],
              createdAt: '2020-04-05T21:08:03.855Z',
              updatedAt: '2020-04-05T21:08:38.889Z',
              __v: 0,
            },
          ],
          tokens: [],
          role: 'user',
          _id: '5e72a16efcc6b8115ee95675',
          email: 'jcummings5@gmail.com',
          password:
            '$2a$10$cM5q9sBIb.w1Rjd2G5UNMOIhl4sWBPi/uZ1lPb.XOpoSDw2ffuU0m',
          createdAt: '2020-03-18T22:32:14.104Z',
          updatedAt: '2020-06-08T02:46:52.602Z',
          __v: 17,
        },
        expires: 'Thu, 02 Jul 2020 15:24:37 GMT',
      };
      const count = 100;
      const linkFilter = ['123', '1234'];

      const error = new Error('error');
      return expectSaga(getClickReport)
        .provide([
          // Use the `select` effect creator from Redux Saga to match
          [select(makeSelectUserData), userData],
          [select(makeSelectClickCount), count],
          [select(makeSelectClickLinkFilter), linkFilter],

          [matchers.call.fn(request), throwError(error)],
        ])
        .put(getClickReportError(error))
        .run();
    });
  });

  describe('getUsersLinks Saga', () => {
    const watcherGenerator = reportsPageSaga();
    test('should wait for every GET_USERS_LINKS action and call getUsersLinks', () => {
      expect(watcherGenerator.next().value).toEqual(
        all([
          takeLatest(GET_CLICK_REPORT, getClickReport),
          takeLatest(GET_USERS_LINKS, getUsersLinks),
        ]),
      );
    });

    test('should be done on next iteration', () => {
      expect(watcherGenerator.next().done).toBeTruthy();
    });

    test('should call api and dispatch success action "getUsersLinkSuccess" with result from clickreport endpoint', async () => {
      const mockResponse = [
        {
          type: 'website',
          archived: false,
          _id: '123',
          creatorId: '1234',
          url: 'https://netflix.com',
        },
        {
          type: 'website',
          archived: false,
          _id: '12345643',
          creatorId: '1234asd',
          url: 'https://impgg.com',
        },
      ];
      const userData = {
        token: {
          tokenType: 'Bearer',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM3MDM0NzcsImlhdCI6MTU5MzYxNzA3Nywic3ViIjoiNWU3MmExNmVmY2M2YjgxMTVlZTk1Njc1In0.Awi5gUc3IuJ0G0jgj5O2qhO5AW5ra_IdRGp_oy9kJAg',
          refreshToken:
            '5e72a16efcc6b8115ee95675.9bc9a98396d2eef2b787f25c235eee8e56bafaaa477fd72e1bdf211614d3811d487287509811ae45',
          expiresIn: '2020-07-02T15:24:37.294Z',
        },
        user: {
          profile: { firstName: 'John', lastName: 'Cummings' },
          preferences: { primaryDomain: 'imp.gg' },
          subscription: { startTimestamp: '2020-03-18T22:32:14.087Z' },
          domains: [
            {
              status: 2,
              validated: true,
              archived: false,
              _id: '5e72a165fcc6b8115ee95674',
              uri: 'imp.gg',
              domainType: 'dom',
              archiveEvents: [],
              createdAt: '2020-03-18T22:32:05.162Z',
              updatedAt: '2020-03-18T22:32:05.162Z',
              __v: 0,
            },
            {
              status: 1,
              validated: false,
              archived: false,
              _id: '5e82797e17423f565bb3eafc',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.isitdone.com',
              archiveEvents: [],
              createdAt: '2020-03-30T22:58:06.467Z',
              updatedAt: '2020-03-30T22:58:06.467Z',
              __v: 0,
            },
            {
              status: 2,
              validated: false,
              archived: false,
              _id: '5e8a48b370b8d6414e1ec02f',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.jackc.io',
              archiveEvents: [],
              createdAt: '2020-04-05T21:08:03.855Z',
              updatedAt: '2020-04-05T21:08:38.889Z',
              __v: 0,
            },
          ],
          tokens: [],
          role: 'user',
          _id: '5e72a16efcc6b8115ee95675',
          email: 'jcummings5@gmail.com',
          password:
            '$2a$10$cM5q9sBIb.w1Rjd2G5UNMOIhl4sWBPi/uZ1lPb.XOpoSDw2ffuU0m',
          createdAt: '2020-03-18T22:32:14.104Z',
          updatedAt: '2020-06-08T02:46:52.602Z',
          __v: 17,
        },
        expires: 'Thu, 02 Jul 2020 15:24:37 GMT',
      };

      return expectSaga(getUsersLinks)
        .provide([
          // Use the `select` effect creator from Redux Saga to match
          [select(makeSelectUserData), userData],

          // Use the `call.fn` matcher from Redux Saga Test Plan
          [matchers.call.fn(request), mockResponse],
        ])
        .put(getUsersLinkSuccess(mockResponse))
        .run();
    });

    test('should call api and dispatch error action "getClickReportError" with error from clickreport endpoint', async () => {
      const userData = {
        token: {
          tokenType: 'Bearer',
          accessToken:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM3MDM0NzcsImlhdCI6MTU5MzYxNzA3Nywic3ViIjoiNWU3MmExNmVmY2M2YjgxMTVlZTk1Njc1In0.Awi5gUc3IuJ0G0jgj5O2qhO5AW5ra_IdRGp_oy9kJAg',
          refreshToken:
            '5e72a16efcc6b8115ee95675.9bc9a98396d2eef2b787f25c235eee8e56bafaaa477fd72e1bdf211614d3811d487287509811ae45',
          expiresIn: '2020-07-02T15:24:37.294Z',
        },
        user: {
          profile: { firstName: 'John', lastName: 'Cummings' },
          preferences: { primaryDomain: 'imp.gg' },
          subscription: { startTimestamp: '2020-03-18T22:32:14.087Z' },
          domains: [
            {
              status: 2,
              validated: true,
              archived: false,
              _id: '5e72a165fcc6b8115ee95674',
              uri: 'imp.gg',
              domainType: 'dom',
              archiveEvents: [],
              createdAt: '2020-03-18T22:32:05.162Z',
              updatedAt: '2020-03-18T22:32:05.162Z',
              __v: 0,
            },
            {
              status: 1,
              validated: false,
              archived: false,
              _id: '5e82797e17423f565bb3eafc',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.isitdone.com',
              archiveEvents: [],
              createdAt: '2020-03-30T22:58:06.467Z',
              updatedAt: '2020-03-30T22:58:06.467Z',
              __v: 0,
            },
            {
              status: 2,
              validated: false,
              archived: false,
              _id: '5e8a48b370b8d6414e1ec02f',
              creatorId: '5e72a16efcc6b8115ee95675',
              uri: 'll.jackc.io',
              archiveEvents: [],
              createdAt: '2020-04-05T21:08:03.855Z',
              updatedAt: '2020-04-05T21:08:38.889Z',
              __v: 0,
            },
          ],
          tokens: [],
          role: 'user',
          _id: '5e72a16efcc6b8115ee95675',
          email: 'jcummings5@gmail.com',
          password:
            '$2a$10$cM5q9sBIb.w1Rjd2G5UNMOIhl4sWBPi/uZ1lPb.XOpoSDw2ffuU0m',
          createdAt: '2020-03-18T22:32:14.104Z',
          updatedAt: '2020-06-08T02:46:52.602Z',
          __v: 17,
        },
        expires: 'Thu, 02 Jul 2020 15:24:37 GMT',
      };

      const error = new Error('error');
      return expectSaga(getUsersLinks)
        .provide([
          // Use the `select` effect creator from Redux Saga to match
          [select(makeSelectUserData), userData],

          [matchers.call.fn(request), throwError(error)],
        ])
        .put(getUsersLinkError(error))
        .run();
    });
  });
});
