import {
  validateURI,
  resetState,
  changeDomain,
  changeSubdomain,
  addDomain,
  addDomainSuccess,
  addDomainError,
} from '../actions';
import {
  ADD_DOMAIN,
  URI_VALIDATION,
  ADD_DOMAIN_SUCCESS,
  ADD_DOMAIN_ERROR,
  CHANGE_DOMAIN,
  CHANGE_SUBDOMAIN,
  RESET_STATE,
} from '../constants';

describe('DomainRegistrationDialog actions', () => {
  describe('validateURI Action', () => {
    it('has a type of URI_VALIDATION and returns false if a valid URI', () => {
      const expected = {
        type: URI_VALIDATION,
        uriValidation: false,
      };
      expect(validateURI('https://www.google.com')).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and returns error if an invalid URI', () => {
      const expected = {
        type: URI_VALIDATION,
        uriValidation: 'Enter a valid URL',
      };
      expect(validateURI('wwwgooglecom')).toEqual(expected);
    });
  });

  describe('resetState Action', () => {
    it('has a type of RESET_STATE', () => {
      const expected = {
        type: RESET_STATE,
      };
      expect(resetState()).toEqual(expected);
    });
  });

  describe('changeDomain Action', () => {
    it('has a type of CHANGE_DOMAIN', () => {
      const expected = {
        type: CHANGE_DOMAIN,
        domain: 'domain.com',
      };
      expect(changeDomain('domain.com')).toEqual(expected);
    });
  });

  describe('changeSubdomain Action', () => {
    it('has a type of CHANGE_SUBDOMAIN', () => {
      const expected = {
        type: CHANGE_SUBDOMAIN,
        subdomain: 'domain.com',
      };
      expect(changeSubdomain('domain.com')).toEqual(expected);
    });
  });

  describe('addDomain Action', () => {
    it('has a type of ADD_DOMAIN', () => {
      const expected = {
        type: ADD_DOMAIN,
      };
      expect(addDomain()).toEqual(expected);
    });
  });

  describe('addDomainSuccess Action', () => {
    it('has a type of ADD_DOMAIN_SUCCESS', () => {
      const expected = {
        type: ADD_DOMAIN_SUCCESS,
      };
      expect(addDomainSuccess()).toEqual(expected);
    });
  });

  describe('addDomainError Action', () => {
    it('has a type of ADD_DOMAIN_ERROR', () => {
      const expected = {
        type: ADD_DOMAIN_ERROR,
        err: 'error',
      };
      expect(addDomainError('error')).toEqual(expected);
    });
  });
});
