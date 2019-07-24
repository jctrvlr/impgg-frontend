/**
 *
 * HomePage
 *
 */

import React from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Header from 'components/Header';

import makeSelectHomePage from './selectors';
import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import reducer from './reducer';
import saga from './saga';
import { logoutUser } from '../App/actions';
// import messages from './messages';

export function HomePage({ userData, loggedIn, onLogoutClick }) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  return (
    <div>
      <Helmet>
        <title>ImpGG - Home</title>
        <meta name="description" content="ImpGG " />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
      />
    </div>
  );
}

HomePage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
