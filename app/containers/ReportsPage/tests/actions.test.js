import {
  getClickReport,
  setClickCountOption,
  setClickLinkFilter,
} from '../actions';
import {
  GET_CLICK_REPORT,
  SET_CLICK_COUNT_OPTION,
  SET_CLICK_LINK_FILTER,
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

  describe('setClickCountOption Action', () => {
    it('has a type of SET_CLICK_COUNT_OPTION', () => {
      const expected = {
        type: SET_CLICK_COUNT_OPTION,
        count: 1000,
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
});
