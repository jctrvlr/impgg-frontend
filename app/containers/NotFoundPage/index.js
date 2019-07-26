/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';

import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Header from 'components/Header/index';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import { logoutUser } from '../App/actions';

import messages from './messages';

export function NotFound({ userData, loggedIn, onLogoutClick }) {
  return (
    <div>
      <Helmet>
        <title>ImpGG - Page not found</title>
        <meta
          name="description"
          content="Oops! Somethin' went wrong somewhere. Sorry about that! ImpGG is your one stop shop for all things... short links. Mischievously short."
        />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
      />
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </div>
  );
}
NotFound.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
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

export default compose(withConnect)(NotFound);
