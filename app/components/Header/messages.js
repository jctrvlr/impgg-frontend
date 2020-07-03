/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Dashboard',
  },
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
  pricing: {
    id: `${scope}.pricing`,
    defaultMessage: 'Pricing',
  },
  resources: {
    id: `${scope}.resources`,
    defaultMessage: 'Resources',
  },
  domains: {
    id: `${scope}.domains`,
    defaultMessage: 'Domains',
  },
  reports: {
    id: `${scope}.reports`,
    defaultMessage: 'Reports',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  logOut: {
    id: `${scope}.logOut`,
    defaultMessage: 'Log out',
  },
  signIn: {
    id: `${scope}.signIn`,
    defaultMessage: 'Sign in',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register an account',
  },
});
