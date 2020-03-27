/*
 * AboutPage Messages
 *
 * This contains all the text for the AboutPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.AboutPage';

export default defineMessages({
  levelUpHeader: {
    id: `${scope}.levelUpHeader`,
    defaultMessage: 'Level up your audience data',
  },
  whoWeAre: {
    id: `${scope}.whoWeAre`,
    defaultMessage:
      'We are ImpGG, an idea sprouted from boredom. We built a platform that allows you to use links to build on your passion, and business.',
  },
});
