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

  describe('changeURI Action', () => {
    it('has a type of CHANGE_URI and passes URI', () => {
      const expected = {
        type: CHANGE_URI,
        uri: 'domain.com',
      };
      expect(changeURI('domain.com')).toEqual(expected);
    });
  });

  describe('fetchUrl Action', () => {
    it('has a type of FETCH_URL', () => {
      const expected = {
        type: FETCH_URL,
      };
      expect(fetchUrl()).toEqual(expected);
    });
  });

  describe('fetchUrlSuccess Action', () => {
    it('has a type of FETCH_URL_SUCCESS', () => {
      const expected = {
        type: FETCH_URL_SUCCESS,
        currentLink: 'currentLink',
        uriHistory: [{ uri: 'domain.com' }],
      };
      expect(fetchUrlSuccess('currentlink', [{ uri: 'domain.com' }])).toEqual(
        expected,
      );
    });
  });

  describe('fetchUrlError Action', () => {
    it('has a type of FETCH_URL_ERROR', () => {
      const expected = {
        type: FETCH_URL_ERROR,
        error: 'error',
      };
      expect(fetchUrlError('error')).toEqual(expected);
    });
  });
});
