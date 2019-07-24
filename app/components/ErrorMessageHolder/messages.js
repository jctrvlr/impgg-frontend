/*
 * ErrorMessageHolder Messages
 *
 * This contains all the text for the ErrorMessageHolder component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.ErrorMessageHolder';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ErrorMessageHolder component!',
  },
});
