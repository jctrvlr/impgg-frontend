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
  GET_USERS_LINKS,
  GET_USERS_LINKS_SUCCESS,
  GET_USERS_LINKS_ERROR,
} from './constants';

export const initialState = {
  clickCount: 100,
  clickLinkFilter: [],
  getReport: false,
  error: false,
  loading: false,
  userLinks: [],
};

/* eslint-disable default-case, no-param-reassign */
const reportsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_CLICK_REPORT:
        draft.loading = true;
        draft.getReport = true;
        draft.error = false;
        break;

      case SET_CLICK_COUNT_OPTION:
        draft.loading = false;
        draft.error = false;
        draft.clickCount = action.clickCount;
        break;

      case SET_CLICK_LINK_FILTER:
        draft.loading = false;
        draft.error = false;
        draft.clickLinkFilter = action.linkIds;
        break;

      case GET_USERS_LINKS:
        draft.loading = true;
        draft.error = false;
        draft.userLinks = [];
        break;

      case GET_USERS_LINKS_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.userLinks = action.userLinks;
        break;

      case GET_USERS_LINKS_ERROR:
        draft.loading = false;
        draft.error = action.err;
        draft.userLinks = [];
        break;
    }
  });

export default reportsPageReducer;
