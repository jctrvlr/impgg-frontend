/*
 *
 * ReportsPage reducer
 *
 */
import produce from 'immer';
import {
  GET_CLICK_REPORT,
  SET_CLICK_COUNT_OPTION,
  SET_CLICK_LINK_FILTER,
} from './constants';

export const initialState = {
  clickCount: false,
  clickLinkFilter: [],
  error: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const reportsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CLICK_REPORT:
        draft.loading = true;
        draft.error = false;
        break;

      case SET_CLICK_COUNT_OPTION:
        draft.loading = false;
        draft.error = false;
        draft.clickCount = action.count;
        break;

      case SET_CLICK_LINK_FILTER:
        draft.loading = false;
        draft.error = false;
        draft.clickLinkFilter = action.linkIds;
        break;
    }
  });

export default reportsPageReducer;
