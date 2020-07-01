import produce from 'immer';
import reportsPageReducer from '../reducer';
import {
  getClickReport,
  setClickCountOption,
  setClickLinkFilter,
  getUsersLink,
  getUsersLinkSuccess,
  getUsersLinkError,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe.only('reportsPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      clickCount: 100,
      clickLinkFilter: [],
      getReport: false,
      error: false,
      loading: false,
      userLinks: [],
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(reportsPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getClickReport action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.getReport = true;
    });

    expect(reportsPageReducer(state, getClickReport())).toEqual(expectedResult);
  });

  it('should handle the setClickCountOption action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.clickCount = 100;
    });

    expect(reportsPageReducer(state, setClickCountOption(100))).toEqual(
      expectedResult,
    );
  });

  it('should handle the setClickLinkFilter action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.clickLinkFilter = ['1234', '123456', '1abc234'];
    });

    expect(
      reportsPageReducer(
        state,
        setClickLinkFilter(['1234', '123456', '1abc234']),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the getUsersLink action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true;
      draft.error = false;
      draft.userLinks = [];
    });

    expect(reportsPageReducer(state, getUsersLink())).toEqual(expectedResult);
  });

  it('should handle the getUsersLinkSuccess action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = false;
      draft.userLinks = [
        { id: '1', url: 'http://google.com' },
        { id: '2', url: 'https://impgg.com' },
      ];
    });

    expect(
      reportsPageReducer(
        state,
        getUsersLinkSuccess([
          { id: '1', url: 'http://google.com' },
          { id: '2', url: 'https://impgg.com' },
        ]),
      ),
    ).toEqual(expectedResult);
  });

  it('should handle the getUsersLinkError action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false;
      draft.error = 'error';
      draft.userLinks = [];
    });

    expect(reportsPageReducer(state, getUsersLinkError('error'))).toEqual(
      expectedResult,
    );
  });
});
