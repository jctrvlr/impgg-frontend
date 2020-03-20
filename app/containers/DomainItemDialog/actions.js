/*
 *
 * TableItemDialog actions
 *
 */

import {
  DELETE_DOMAIN,
  DELETE_DOMAIN_SUCCESS,
  DELETE_DOMAIN_ERROR,
} from './constants';

/**
 * Deletes domain
 *
 * @return {object} An action object with a type of DELETE_DOMAIN
 */
export function deleteDomain() {
  return {
    type: DELETE_DOMAIN,
  };
}

/**
 * Delete domain success
 *
 * @return {object} An action object with a type of DELETE_DOMAIN_SUCCESS
 */
export function deleteDomainSuccess() {
  return {
    type: DELETE_DOMAIN_SUCCESS,
  };
}

/**
 * Delete domain error
 *
 * @return {object} An action object with a type of DELETE_DOMAIN_ERROR
 */
export function deleteDomainError(err) {
  return {
    type: DELETE_DOMAIN_ERROR,
    err,
  };
}
