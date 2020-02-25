/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import {
  GET_TABLEDATA,
  TABLEDATA_SUCCESS,
  TABLEDATA_ERROR,
  FETCH_URL,
  FETCH_URL_SUCCESS,
  FETCH_URL_ERROR,
  URI_VALIDATION,
  CHANGE_URI,
  CHANGE_SELECTED_DATA,
  CHANGE_TABLE_ARCHIVE,
  ARCHIVE_LINK,
  ARCHIVE_LINK_SUCCESS,
  ARCHIVE_LINK_ERROR,
} from './constants';

export const initialState = {
  loading: true,
  newLink: true,
  error: false,
  tableData: [],
  uri: false,
  uriValidation: false,
  currentLink: false,
  selectedData: [{}],
  tableArchived: false,
  linkId: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_TABLE_ARCHIVE:
        draft.tableArchive = !draft.tableArchive;
        break;

      case GET_TABLEDATA:
        draft.loading = true;
        draft.error = false;
        draft.tableData = [];
        break;

      case TABLEDATA_SUCCESS:
        draft.tableData = action.tData;
        draft.loading = false;
        draft.newLink = false;
        break;

      case TABLEDATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case CHANGE_URI:
        draft.uri = action.uri;
        break;

      case CHANGE_SELECTED_DATA:
        draft.selectedData = action.selectedData;
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
        draft.newLink = true;
        draft.currentLink = action.currentLink;
        draft.uriHistory = action.uriHistory;
        break;

      case FETCH_URL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        draft.currentLink = false;
        break;

      case ARCHIVE_LINK:
        draft.linkId = action.linkId;
        break;

      case ARCHIVE_LINK_SUCCESS:
        draft.linkId = false;
        break;

      case ARCHIVE_LINK_ERROR:
        draft.linkId = false;
        break;
    }
  });

export default dashboardReducer;
