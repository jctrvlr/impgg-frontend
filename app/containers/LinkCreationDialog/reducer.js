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
  CHANGE_SLINK,
  GEN_SLINK,
  GEN_SLINK_SUCCESS,
  GEN_SLINK_ERROR,
} from './constants';

export const initialState = {
  uri: '',
  sLink: false,
  linkDomain: '',
  uriValidation: false,
  sLinkError: false,
  currentLink: false,
  loading: false,
  fetchLinkSuccess: false,
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

      case CHANGE_SLINK:
        draft.sLink = action.sLink;
        break;

      case URI_VALIDATION:
        draft.uriValidation = action.uriValidation;
        break;

      case GEN_SLINK:
        draft.loading = true;
        draft.error = false;
        break;

      case GEN_SLINK_SUCCESS:
        draft.sLink = action.sLink;
        draft.loading = false;
        break;

      case GEN_SLINK_ERROR:
        draft.sLinkError = action.sLinkError;
        draft.loading = false;
        draft.sLink = '';
        break;

      case FETCH_URL:
        draft.loading = true;
        draft.error = false;
        draft.fetchLinkSuccess = false;
        break;

      case FETCH_URL_SUCCESS:
        draft.loading = false;
        draft.currentLink = action.currentLink;
        draft.fetchLinkSuccess = true;
        break;

      case FETCH_URL_ERROR:
        draft.sLinkError = action.error;
        draft.loading = false;
        draft.currentLink = false;
        draft.fetchLinkSuccess = false;
        break;
    }
  });

export default linkCreationDialogReducer;
