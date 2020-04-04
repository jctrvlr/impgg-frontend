import { validateURI } from '../actions';
import { URI_VALIDATION } from '../constants';

describe('LinkCreationDialog actions', () => {
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
});
