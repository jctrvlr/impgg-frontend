/**
 *
 * Asynchronously loads the component for OAuthCallback
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
