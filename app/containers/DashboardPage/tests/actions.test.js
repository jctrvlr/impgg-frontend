import {
  getTableData,
  tableDataSuccess,
  tableDataError,
  validateURI,
  changeURI,
  fetchUrl,
  fetchUrlError,
  fetchUrlSuccess,
} from '../actions';
import {
  GET_TABLEDATA,
  TABLEDATA_SUCCESS,
  TABLEDATA_ERROR,
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
} from '../constants';

describe('Dashboard actions', () => {
  describe('getTableData', () => {
    it('has a type of GET_TABLEDATA', () => {
      const expected = {
        type: GET_TABLEDATA,
      };
      expect(getTableData()).toEqual(expected);
    });
  });

  describe('tableDataSuccess', () => {
    it('has a type of TABLEDATA_SUCCESS', () => {
      const fixture = [];
      const expected = {
        type: TABLEDATA_SUCCESS,
        tData: fixture,
      };
      expect(tableDataSuccess(fixture)).toEqual(expected);
    });
  });

  describe('tableDataError', () => {
    it('has a type of TABLEDATA_ERROR', () => {
      const expected = {
        type: TABLEDATA_ERROR,
      };
      expect(tableDataError()).toEqual(expected);
    });
  });

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

  describe('changeURI', () => {
    it('has a type of CHANGE_URI', () => {
      const expected = {
        type: CHANGE_URI,
      };
      expect(changeURI()).toEqual(expected);
    });
  });

  describe('fetchUrl', () => {
    it('has a type of FETCH_URL', () => {
      const expected = {
        type: FETCH_URL,
      };
      expect(fetchUrl()).toEqual(expected);
    });
  });

  describe('fetchUrlError', () => {
    it('has a type of FETCH_URL_ERROR', () => {
      const expected = {
        type: FETCH_URL_ERROR,
      };
      expect(fetchUrlError()).toEqual(expected);
    });
  });

  describe('fetchUrlSuccess', () => {
    it('has a type of FETCH_URL_SUCCESS', () => {
      const expected = {
        type: FETCH_URL_SUCCESS,
      };
      expect(fetchUrlSuccess()).toEqual(expected);
    });
  });
});
