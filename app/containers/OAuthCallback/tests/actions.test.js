import { changeService, changeCode } from '../actions';
import { CHANGE_SERVICE, CHANGE_CODE } from '../constants';

describe('OAuthCallback actions', () => {
  describe('changeService Action', () => {
    it('has a type of CHANGE_SERVICE', () => {
      const expected = {
        type: CHANGE_SERVICE,
        service: 'twitch',
      };
      expect(changeService('twitch')).toEqual(expected);
    });
  });

  describe('changeCode Action', () => {
    it('has a type of CHANGE_CODE', () => {
      const expected = {
        type: CHANGE_CODE,
        code: '1234',
      };
      expect(changeCode('1234')).toEqual(expected);
    });
  });
});
