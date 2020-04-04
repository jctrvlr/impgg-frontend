import {
  validateURI,
  changeURI,
  fetchUrl,
  fetchUrlSuccess,
  fetchUrlError,
} from '../actions';
import {
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
} from '../constants';

describe('HomePage actions', () => {
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

  describe('changeURI action', () => {
    it('should have a type of CHANGE_URI and pass uri', () => {
      const fixture = 'batman.com';
      const expected = {
        type: CHANGE_URI,
        uri: fixture,
      };
      expect(changeURI(fixture)).toEqual(expected);
    });
  });

  describe('fetchUrl action', () => {
    it('should have a type of FETCH_URL', () => {
      const expected = {
        type: FETCH_URL,
      };
      expect(fetchUrl()).toEqual(expected);
    });
  });

  describe('fetchUrlSuccess action', () => {
    it('should have a type of FETCH_URL_SUCCESS', () => {
      const fixtureLink = {};
      const fixtureUriHistory = [];
      const expected = {
        type: FETCH_URL_SUCCESS,
        currentLink: fixtureLink,
        uriHistory: fixtureUriHistory,
      };
      expect(fetchUrlSuccess(fixtureLink, fixtureUriHistory)).toEqual(expected);
    });
  });

  describe('fetchUrlError action', () => {
    it('should have a type of FETCH_URL_ERROR', () => {
      const fixture = 'error';
      const expected = {
        type: FETCH_URL_ERROR,
        error: fixture,
      };
      expect(fetchUrlError(fixture)).toEqual(expected);
    });
  });
});
