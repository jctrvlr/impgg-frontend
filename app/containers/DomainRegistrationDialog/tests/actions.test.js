import {
  validateURI,
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
} from '../constants';

describe('DomainRegistrationDialog actions', () => {
  describe('validateURI Action', () => {
    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with no http(s):// and no www', () => {
      const result = false;
      const fixture = 'google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with http:// but no www', () => {
      const result = false;
      const fixture = 'http://google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with http:// and www', () => {
      const result = false;
      const fixture = 'http://www.google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes false for uriValidation with valid uri with https:// and www', () => {
      const result = false;
      const fixture = 'https://www.google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes error message for uriValidation with invalid uri with no TLD', () => {
      const result = 'Enter a valid URL';
      const fixture = 'google';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes error message for uriValidation with invalid uri with symbols', () => {
      const result = 'Enter a valid URL';
      const fixture = '$google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });

    it('has a type of URI_VALIDATION and passes error message for uriValidation with invalid uri with symbols', () => {
      const result = 'Enter a valid URL';
      const fixture = '$google.com';

      const expected = {
        type: URI_VALIDATION,
        uriValidation: result,
      };
      expect(validateURI(fixture)).toEqual(expected);
    });
  });

  describe('changeDomain action', () => {
    it('should return type CHANGE_DOMAIN and passed domain', () => {
      const fixture = 'domain.com';
      const expected = {
        type: CHANGE_DOMAIN,
        domain: fixture,
      };
      expect(changeDomain(fixture)).toEqual(expected);
    });
  });

  describe('changeSubdomain action', () => {
    it('should return type CHANGE_SUBDOMAIN and passed subdomain', () => {
      const fixture = 'sub';
      const expected = {
        type: CHANGE_SUBDOMAIN,
        subdomain: fixture,
      };
      expect(changeSubdomain(fixture)).toEqual(expected);
    });
  });

  describe('addDomain action', () => {
    it('should return type ADD_DOMAIN', () => {
      const expected = {
        type: ADD_DOMAIN,
      };
      expect(addDomain()).toEqual(expected);
    });
  });

  describe('addDomainSuccess action', () => {
    it('should return type ADD_DOMAIN_SUCCESS', () => {
      const expected = {
        type: ADD_DOMAIN_SUCCESS,
      };
      expect(addDomainSuccess()).toEqual(expected);
    });
  });

  describe('addDomainError action', () => {
    it('should return type ADD_DOMAIN_ERROR and passed error', () => {
      const fixture = 'error';
      const expected = {
        type: ADD_DOMAIN_ERROR,
        err: fixture,
      };
      expect(addDomainError(fixture)).toEqual(expected);
    });
  });
});
