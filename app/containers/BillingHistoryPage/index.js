/**
 *
 * BillingHistoryPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectBillingHistoryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function BillingHistoryPage() {
  useInjectReducer({ key: 'billingHistoryPage', reducer });
  useInjectSaga({ key: 'billingHistoryPage', saga });

  return (
    <div>
      <Helmet>
        <title>BillingHistoryPage</title>
        <meta name="description" content="Description of BillingHistoryPage" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

BillingHistoryPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  billingHistoryPage: makeSelectBillingHistoryPage(),
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

export default compose(
  withConnect,
  memo,
)(BillingHistoryPage);
