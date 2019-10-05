/*
 *
 * Dashboard actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_TABLEDATA,
  TABLEDATA_SUCCESS,
  TABLEDATA_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTableData() {
  return {
    type: GET_TABLEDATA,
  };
}

export function tableDataSuccess(tableData) {
  return {
    type: TABLEDATA_SUCCESS,
    tableData,
  };
}

export function tableDataError(error) {
  return {
    type: TABLEDATA_ERROR,
    error,
  };
}
