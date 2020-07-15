/**
 *
 * OAuthCallback
 *
 */

import React, { memo, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Logo from 'images/impgg-withquestionmarks.png';

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import HeartIcon from '@material-ui/icons/Favorite';
import Link from '@material-ui/core/Link';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { changeService, changeCode } from './actions';
import { oAuthLogin } from '../App/actions';
import makeSelectOAuthCallback from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoggedIn, makeSelectError } from '../App/selectors';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    marginTop: 'auto',
  },
  logo: {
    height: 100,
    margin: 10,
    marginBottom: 33,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textContainer: {
    textAlign: 'center',
  },
}));

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Made with '} <HeartIcon /> {' on Earth'}
    </Typography>
  );
}

export function OAuthCallback({
  match,
  error,
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
      setCode(qStrings.code);
      sendOAuthLogin();
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      window.opener.location.reload();
      window.close();
    }
  }, [loggedIn]);

  return (
    <div className={classes.container}>
      <Helmet>
        <title>ImpGG - OAuth</title>
        <meta name="description" content="ImpGG OAuth Callback Page" />
      </Helmet>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Link component={RouterLink} to="/" className={classes.toolbarTitle}>
            <img
              alt="ImpGG logo. Your friendly neighborhood link shortener"
              src={Logo}
              className={classes.logo}
            />
          </Link>
          {error ? (
            <div className={classes.textContainer}>
              <Typography variant="h4">
                Sorry something went wrong{' '}
                <span role="img" aria-label="sad face">
                  😞
                </span>
              </Typography>
              <Typography variant="body">{error}</Typography>
            </div>
          ) : (
            <LinearProgress />
          )}
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    </div>
  );
}

OAuthCallback.propTypes = {
  match: PropTypes.object,
  setService: PropTypes.func,
  setCode: PropTypes.func,
  loggedIn: PropTypes.bool,
  sendOAuthLogin: PropTypes.func,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  oAuthCallback: makeSelectOAuthCallback(),
  loggedIn: makeSelectLoggedIn(),
  error: makeSelectError(),
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
