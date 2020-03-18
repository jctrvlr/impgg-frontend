/*
 * Dashboard Messages
 *
 * This contains all the text for the Dashboard container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.DashboardPage';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  domains: {
    id: `${scope}.domains`,
    defaultMessage: 'Domains',
  },
  settings: {
    id: `${scope}.settings`,
    defaultMessage: 'Settings',
  },
  logOut: {
    id: `${scope}.logOut`,
    defaultMessage: 'Log out',
  },
});
