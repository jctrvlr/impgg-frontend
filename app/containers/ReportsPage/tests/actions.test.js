import {
  getClickReport,
  getClickReportSuccess,
  getClickReportError,
  setClickCountOption,
  setClickLinkFilter,
  getUsersLink,
  getUsersLinkSuccess,
  getUsersLinkError,
} from '../actions';
import {
  GET_CLICK_REPORT,
  GET_CLICK_REPORT_SUCCESS,
  GET_CLICK_REPORT_ERROR,
  SET_CLICK_COUNT_OPTION,
  SET_CLICK_LINK_FILTER,
  GET_USERS_LINKS,
  GET_USERS_LINKS_SUCCESS,
  GET_USERS_LINKS_ERROR,
} from '../constants';

describe('ReportsPage actions', () => {
  describe('getClickReport Action', () => {
    it('has a type of GET_CLICK_REPORT', () => {
      const expected = {
        type: GET_CLICK_REPORT,
      };
      expect(getClickReport()).toEqual(expected);
    });
  });

  describe('getClickReportSuccess Action', () => {
    it('has a type of GET_CLICK_REPORT_SUCCESS', () => {
      const expected = {
        type: GET_CLICK_REPORT_SUCCESS,
        resp: 'response',
      };
      expect(getClickReportSuccess('response')).toEqual(expected);
    });
  });

  describe('getClickReportError Action', () => {
    it('has a type of GET_CLICK_REPORT_ERROR', () => {
      const expected = {
        type: GET_CLICK_REPORT_ERROR,
        err: 'error',
      };
      expect(getClickReportError('error')).toEqual(expected);
    });
  });

  describe('setClickCountOption Action', () => {
    it('has a type of SET_CLICK_COUNT_OPTION', () => {
      const expected = {
        type: SET_CLICK_COUNT_OPTION,
        clickCount: 1000,
      };
      expect(setClickCountOption(1000)).toEqual(expected);
    });
  });

  describe('setClickLinkFilter Action', () => {
    it('has a type of SET_CLICK_LINK_FILTER', () => {
      const expected = {
        type: SET_CLICK_LINK_FILTER,
        linkIds: ['1234', '12345', '1abc234'],
      };
      expect(setClickLinkFilter(['1234', '12345', '1abc234'])).toEqual(
        expected,
      );
    });
  });

  describe('getUsersLink Action', () => {
    it('has a type of GET_USERS_LINKS', () => {
      const expected = {
        type: GET_USERS_LINKS,
      };
      expect(getUsersLink()).toEqual(expected);
    });
  });

  describe('getUsersLinkSuccess Action', () => {
    it('has a type of GET_USERS_LINKS_SUCCESS', () => {
      const expected = {
        type: GET_USERS_LINKS_SUCCESS,
        userLinks: [
          { id: '1', url: 'http://google.com' },
          { id: '2', url: 'https://impgg.com' },
        ],
      };
      expect(
        getUsersLinkSuccess([
          { id: '1', url: 'http://google.com' },
          { id: '2', url: 'https://impgg.com' },
        ]),
      ).toEqual(expected);
    });
  });

  describe('getUsersLinkError Action', () => {
    it('has a type of GET_USERS_LINKS_ERROR', () => {
      const expected = {
        type: GET_USERS_LINKS_ERROR,
        err: 'error',
      };
      expect(getUsersLinkError('error')).toEqual(expected);
    });
  });
});
