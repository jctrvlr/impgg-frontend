/**
 *
 * OAuthCallback
 *
 */

import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import LinearProgress from '@material-ui/core/LinearProgress';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { changeService, changeCode } from './actions';
import { oAuthLogin } from '../App/actions';
import makeSelectOAuthCallback from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoggedIn } from '../App/selectors';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    marginTop: 'auto',
  },
}));

export function OAuthCallback({
  match,
  setService,
  setCode,
  sendOAuthLogin,
  loggedIn,
}) {
  useInjectReducer({ key: 'oAuthCallback', reducer });
  useInjectSaga({ key: 'oAuthCallback', saga });

  const classes = useStyles();

  const location = useLocation();
  const qStrings = queryString.parse(location.search);

  useEffect(() => {
    setService(match.params.service);

    if (qStrings.code) {
      console.log('The code is: ', qStrings.code);
      setCode(qStrings.code);
      sendOAuthLogin();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      window.close();
    }
  }, [loggedIn]);

  return (
    <div className={classes.container}>
      <Helmet>
        <title>ImpGG - OAuth</title>
        <meta name="description" content="Description of OAuthCallback" />
      </Helmet>
      <LinearProgress />
    </div>
  );
}

OAuthCallback.propTypes = {
  match: PropTypes.object,
  setService: PropTypes.func,
  setCode: PropTypes.func,
  loggedIn: PropTypes.bool,
  sendOAuthLogin: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  oAuthCallback: makeSelectOAuthCallback(),
  loggedIn: makeSelectLoggedIn(),
});

function mapDispatchToProps(dispatch) {
  return {
    setService: service => {
      dispatch(changeService(service));
    },
    setCode: code => {
      dispatch(changeCode(code));
    },
    sendOAuthLogin: () => {
      dispatch(oAuthLogin());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OAuthCallback);
