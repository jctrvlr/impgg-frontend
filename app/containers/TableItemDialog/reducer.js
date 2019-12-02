/*
 *
 * TableItemDialog reducer
 *
 */
import produce from 'immer';
import {
  UPDATE_LINK,
  UPDATE_LINK_SUCCESS,
  UPDATE_LINK_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_DOMAIN,
  CHANGE_SLINK,
  RESET_FIELDS,
  GEN_SLINK,
  GEN_SLINK_SUCCESS,
  GEN_SLINK_ERROR,
} from './constants';

export const initialState = {
  uri: '',
  sLink: false,
  linkDomain: '',
  uriValidation: false,
  uriError: false,
  sLinkError: false,
  currentLink: false,
  loading: false,
  updateLinkSuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const tableItemDialogReducer = (state = initialState, action) =>
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

      case RESET_FIELDS:
        draft.sLink = false;
        draft.uri = '';
        draft.linkDomain = '';
        break;

      case URI_VALIDATION:
        draft.uriValidation = action.uriValidation;
        break;

      case GEN_SLINK:
        draft.loading = true;
        draft.sLinkError = false;
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

      case UPDATE_LINK:
        draft.loading = true;
        draft.error = false;
        draft.updateLinkSuccess = false;
        break;

      case UPDATE_LINK_SUCCESS:
        draft.loading = false;
        draft.currentLink = action.currentLink;
        draft.updateLinkSuccess = true;
        break;

      case UPDATE_LINK_ERROR:
        draft.sLinkError = action.error;
        draft.loading = false;
        draft.currentLink = false;
        draft.updateLinkSuccess = false;
        break;
    }
  });

export default tableItemDialogReducer;
