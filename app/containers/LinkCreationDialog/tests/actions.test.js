import { validateURI } from '../actions';
import { URI_VALIDATION } from '../constants';

describe('LinkCreationDialog actions', () => {
  describe('URL Validation', () => {
    it('has a type of URI_VALIDATION', () => {
      const expected = {
        type: URI_VALIDATION,
      };
      expect(validateURI()).toEqual(expected);
    });
    // TODO: Do more tests.
  });
});
