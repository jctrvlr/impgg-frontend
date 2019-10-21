/*
 *
 * LinkCreationDialog reducer
 *
 */
import produce from 'immer';
import {
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_DOMAIN,
} from './constants';

export const initialState = {
  uri: false,
  linkDomain: false,
  uriValidation: false,
  currentLink: false,
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const linkCreationDialogReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_URI:
        draft.uri = action.uri;
        break;

      case CHANGE_DOMAIN:
        draft.linkDomain = action.linkDomain;
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

export default linkCreationDialogReducer;
