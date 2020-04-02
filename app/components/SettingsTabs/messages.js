/*
 * SettingsTabs Messages
 *
 * This contains all the text for the SettingsTabs component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SettingsTabs';

export default defineMessages({
  profile: {
    id: `${scope}.profile`,
    defaultMessage: 'Profile',
  },
  security: {
    id: `${scope}.security`,
    defaultMessage: 'Security & Privacy',
  },
  subscription: {
    id: `${scope}.subscription`,
    defaultMessage: 'Subscription',
  },
});
