/**
 *
 * DomainsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDomainsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DomainsPage() {
  useInjectReducer({ key: 'domainsPage', reducer });
  useInjectSaga({ key: 'domainsPage', saga });

  return (
    <div>
      <Helmet>
        <title>DomainsPage</title>
        <meta name="description" content="Description of DomainsPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DomainsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  domainsPage: makeSelectDomainsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DomainsPage);
