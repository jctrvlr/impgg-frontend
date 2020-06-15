import { changeSelectedDomain, reloadUser, reloadUserError } from '../actions';
import {
  CHANGE_SELECTED_DOMAIN,
  RELOAD_USER,
  RELOAD_USER_ERROR,
} from '../constants';

describe('DomainsPage actions', () => {
  describe('changeSelectedDomain Action', () => {
    it('has a type of CHANGE_SELECTED_DOMAIN', () => {
      const expected = {
        type: CHANGE_SELECTED_DOMAIN,
        selectedDomain: 'domain.com',
      };
      expect(changeSelectedDomain('domain.com')).toEqual(expected);
    });
  });

  describe('reloadUser Action', () => {
    it('has a type of RELOAD_USER', () => {
      const expected = {
        type: RELOAD_USER,
      };
      expect(reloadUser()).toEqual(expected);
    });
  });

  describe('reloadUserError Action', () => {
    it('has a type of RELOAD_USER_ERROR', () => {
      const expected = {
        type: RELOAD_USER_ERROR,
        err: 'error',
      };
      expect(reloadUserError('error')).toEqual(expected);
    });
  });
});
