import {
  validateURI,
  resetState,
  generateShortLink,
  generateShortLinkSuccess,
  generateShortLinkError,
  changeURI,
  changeDomain,
  changeSLink,
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
  CHANGE_DOMAIN,
  CHANGE_SLINK,
  GEN_SLINK,
  GEN_SLINK_SUCCESS,
  GEN_SLINK_ERROR,
  RESET_STATE,
} from '../constants';

describe('LinkCreationDialog actions', () => {
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

  describe('generateShortLink Action', () => {
    it('has a type of GEN_SLINK', () => {
      const expected = {
        type: GEN_SLINK,
      };
      expect(generateShortLink()).toEqual(expected);
    });
  });

  describe('generateShortLinkSuccess Action', () => {
    it('has a type of GEN_SLINK_SUCCESS and passes sLink', () => {
      const expected = {
        type: GEN_SLINK_SUCCESS,
        sLink: '123abc',
      };
      expect(generateShortLinkSuccess('123abc')).toEqual(expected);
    });
  });

  describe('generateShortLinkError Action', () => {
    it('has a type of GEN_SLINK_ERROR and passes sLinkError', () => {
      const expected = {
        type: GEN_SLINK_ERROR,
        sLinkError: 'error',
      };
      expect(generateShortLinkError('error')).toEqual(expected);
    });
  });

  describe('changeURI Action', () => {
    it('has a type of CHANGE_URI and passes uri', () => {
      const expected = {
        type: CHANGE_URI,
        uri: 'domain.com',
      };
      expect(changeURI('domain.com')).toEqual(expected);
    });
  });

  describe('changeDomain Action', () => {
    it('has a type of CHANGE_DOMAIN and passes domain', () => {
      const expected = {
        type: CHANGE_DOMAIN,
        domain: 'domain.com',
      };
      expect(changeDomain('domain.com')).toEqual(expected);
    });
  });

  describe('changeSLink Action', () => {
    it('has a type of CHANGE_SLINK and passes sLink', () => {
      const expected = {
        type: CHANGE_SLINK,
        sLink: '123abc',
      };
      expect(changeSLink('123abc')).toEqual(expected);
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
    it('has a type of FETCH_URL_SUCCESS and pass currentLink', () => {
      const expected = {
        type: FETCH_URL_SUCCESS,
        currentLink: { uri: 'domain.com', id: '12345' },
      };
      expect(fetchUrlSuccess({ uri: 'domain.com', id: '12345' })).toEqual(
        expected,
      );
    });
  });

  describe('fetchUrlError Action', () => {
    it('has a type of FETCH_URL_ERROR and pass error', () => {
      const expected = {
        type: FETCH_URL_ERROR,
        error: 'error',
      };
      expect(fetchUrlError('error')).toEqual(expected);
    });
  });
});
