/*
 *
 * ReportsPage actions
 *
 */

import {
  GET_CLICK_REPORT,
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
