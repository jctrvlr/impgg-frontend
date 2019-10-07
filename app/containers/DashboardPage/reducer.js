/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_TABLEDATA,
  TABLEDATA_SUCCESS,
  TABLEDATA_ERROR,
} from './constants';

export const initialState = {
  loading: true,
  error: false,
  tableData: [],
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_TABLEDATA:
        draft.loading = true;
        draft.error = false;
        draft.tableData = [];
        break;
      case TABLEDATA_SUCCESS:
        console.log('Inside table data success', action.tableData);
        draft.tableData = action.tableData;
        draft.loading = false;
        break;
      case TABLEDATA_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default dashboardReducer;
