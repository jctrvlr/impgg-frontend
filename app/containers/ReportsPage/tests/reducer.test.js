import produce from 'immer';
import reportsPageReducer from '../reducer';
import {
  getClickReport,
  setClickCountOption,
  setClickLinkFilter,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe.only('reportsPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      clickCount: false,
      clickLinkFilter: [],
      error: false,
      loading: false,
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
});
