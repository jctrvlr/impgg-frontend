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
  about: {
    id: `${scope}.about`,
    defaultMessage: 'About',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  pricing: {
    id: `${scope}.pricing`,
    defaultMessage: 'Pricing',
  },
  resources: {
    id: `${scope}.resources`,
    defaultMessage: 'Resources',
  },
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
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
