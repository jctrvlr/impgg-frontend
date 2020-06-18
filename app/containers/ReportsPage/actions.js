/*
 *
 * ReportsPage actions
 *
 */

import {
  GET_CLICK_REPORT,
  GET_CLICK_REPORT_SUCCESS,
  GET_CLICK_REPORT_ERROR,
  SET_CLICK_COUNT_OPTION,
  SET_CLICK_LINK_FILTER,
} from './constants';

/**
 * Get click Report -- Starts saga to get click report
 */
export function getClickReport() {
  return {
    type: GET_CLICK_REPORT,
  };
}

/**
 * Get click Report -- Successful saga
 */
export function getClickReportSuccess(resp) {
  return {
    type: GET_CLICK_REPORT_SUCCESS,
    resp,
  };
}

/**
 * Get click Report -- Failed saga with error
 */
export function getClickReportError(err) {
  return {
    type: GET_CLICK_REPORT_ERROR,
    err,
  };
}

/**
 * Sets click report last count option
 * @param count [int] - How many clicks to include in report
 */
export function setClickCountOption(count) {
  return {
    type: SET_CLICK_COUNT_OPTION,
    count,
  };
}

/**
 * Sets click report link filter option
 * @param linkIds [Array] - Array of links to include in report
 */
export function setClickLinkFilter(linkIds) {
  return {
    type: SET_CLICK_LINK_FILTER,
    linkIds,
  };
}
