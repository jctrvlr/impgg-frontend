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
  platformHeader: {
    id: `${scope}.platformHeader`,
    defaultMessage: 'Links made easy (and free!)',
  },
  platformBody: {
    id: `${scope}.platformBody`,
    defaultMessage:
      'ImpGG is a free (no fine print) link shortening service that allows you to add your own domains, and create as many links as you want.',
  },
  analyticsHeader: {
    id: `${scope}.analyticsHeader`,
    defaultMessage: 'Put your links to work',
  },
  analyticsBody: {
    id: `${scope}.analyticsBody`,
    defaultMessage:
      'Learn about your audience using ImpGGs audience analytics. Make more informed decisions with metrics like geographic area (down to the state level), top referring channels, type of platform, type of device, and even type of browser.',
  },
  customHeader: {
    id: `${scope}.customHeader`,
    defaultMessage: 'B.Y.O.B - Bring your own branding',
  },
  customBody: {
    id: `${scope}.customBody`,
    defaultMessage:
      'Use any domain name you already own (or even are currently using), connecting both your recognizable domain and our powerful analytics platform.',
  },
  ctaHeader: {
    id: `${scope}.ctaHeader`,
    defaultMessage: 'Start creating links worth clicking today',
  },
  ctaButton: {
    id: `${scope}.ctaButton`,
    defaultMessage: 'Learn more',
  },
});
