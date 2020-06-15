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

describe('TableItemDialog actions', () => {
  describe('deleteDomain Action', () => {
    it('has a type of DELETE_DOMAIN', () => {
      const expected = {
        type: DELETE_DOMAIN,
      };
      expect(deleteDomain()).toEqual(expected);
    });
  });

  describe('deleteDomainSuccess Action', () => {
    it('has a type of DELETE_DOMAIN_SUCCESS', () => {
      const expected = {
        type: DELETE_DOMAIN_SUCCESS,
      };
      expect(deleteDomainSuccess()).toEqual(expected);
    });
  });

  describe('deleteDomainError Action', () => {
    it('has a type of DELETE_DOMAIN_ERROR and passes err to reducer', () => {
      const expected = {
        type: DELETE_DOMAIN_ERROR,
        err: 'Error',
      };
      expect(deleteDomainError('Error')).toEqual(expected);
    });
  });
});
