/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import {
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
} from './constants';

export const initialState = {
  uri: false,
  uriValidation: false,
  currentLink: false,
  uriHistory: localStorage.getItem('uriHistory')
    ? JSON.parse(localStorage.getItem('uriHistory'))
    : [],
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_URI:
        draft.uri = action.uri;
        break;

      case URI_VALIDATION:
        draft.uriValidation = action.uriValidation;
        break;

      case FETCH_URL:
        draft.loading = true;
        draft.error = false;
        break;

      case FETCH_URL_SUCCESS:
        draft.loading = false;
        draft.currentLink = action.currentLink;
        draft.uriHistory = action.uriHistory;
        break;

      case FETCH_URL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.currentLink = false;
        break;
    }
  });

export default homePageReducer;
