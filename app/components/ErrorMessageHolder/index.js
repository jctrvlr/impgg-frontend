/**
 *
 * ErrorMessageHolder
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function ErrorMessageHolder(props) {
  if (props.error !== false) {
    return <div>There was a problem</div>;
  }
  return null;
}

ErrorMessageHolder.propTypes = {
  error: PropTypes.any,
};

export default ErrorMessageHolder;
