import {
  deleteDomain,
  deleteDomainSuccess,
  deleteDomainError,
} from '../actions';
import {
  DELETE_DOMAIN,
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_ERROR,
} from '../constants';

describe('DomainItemDialog actions', () => {
  describe('deleteDomain action', () => {
    it('has a type of DELETE_DOMAIN', () => {
      const expected = {
        type: DELETE_DOMAIN,
      };
      expect(deleteDomain()).toEqual(expected);
    });
  });

  describe('deleteDomainSuccess action', () => {
    it('has a type of DELETE_DOMAIN', () => {
      const expected = {
        type: DELETE_DOMAIN_SUCCESS,
      };
      expect(deleteDomainSuccess()).toEqual(expected);
    });
  });

  describe('deleteDomainError action', () => {
    it('has a type of DELETE_DOMAIN_ERROR', () => {
      const fixture = 'error';
      const expected = {
        type: DELETE_DOMAIN_ERROR,
        err: fixture,
      };
      expect(deleteDomainError(fixture)).toEqual(expected);
    });
  });
});
