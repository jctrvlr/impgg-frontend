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
      const expected = {
        type: TABLEDATA_SUCCESS,
      };
      expect(tableDataSuccess()).toEqual(expected);
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
