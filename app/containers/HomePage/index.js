/* eslint-disable no-unused-vars */
/**
 *
 * HomePage
 * TODO: https://github.com/davidshimjs/qrcodejs --- QR CODES
 */

import React from 'react';

import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import LinkList from 'components/LinkList';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import makeSelectHomePage, {
  makeSelectURI,
  makeSelectURIValidation,
  makeSelectURIHistory,
} from './selectors';
import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import reducer from './reducer';
import saga from './saga';

import { logoutUser } from '../App/actions';
import { changeURI, validateURI, fetchUrl } from './actions';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  banner: {
    width: '100%',
  },
  formContent: {
    padding: theme.spacing(8, 0, 6),
    [theme.breakpoints.up('769')]: {
      height: '500px',
    },
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.down(769)]: {
      paddingBottom: theme.spacing(0),
      height: '300px',
    },
  },
  heroContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E31837',
    [theme.breakpoints.up('769')]: {
      height: '768px',
    },
    paddingBottom: theme.spacing(12),
    [theme.breakpoints.down(769)]: {
      paddingBottom: theme.spacing(0),
      height: '500px',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    [theme.breakpoints.down(769)]: {
      width: '80%',
      margin: 'auto',
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heroHeadText: {
    fontWeight: 'bold',
    paddingTop: theme.spacing(23),
    color: '#fff',
    [theme.breakpoints.down(769)]: {
      fontSize: '1.725rem',
      paddingTop: theme.spacing(10),
    },
  },
  heroText: {
    marginBottom: theme.spacing(3),
    color: 'rgba(255, 255, 255, 0.7)',
    [theme.breakpoints.down(769)]: {
      fontSize: '1.725rem',
    },
  },
  heroButton: {
    marginLeft: theme.spacing(50),
    backgroundColor: theme.palette.caution,
    color: '#111',
    [theme.breakpoints.down(768)]: {
      marginLeft: '0',
    },
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export function HomePage({
  userData,
  uri,
  loggedIn,
  onLogoutClick,
  onSubmitForm,
  onChangeURI,
  uriValidation,
  uriHistory,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });
  const classes = useStyles();
  /**
   * <img
          src="https://via.placeholder.com/1280x500"
          alt="ImpGG banner"
          className={classes.banner}
        />
   */

  const linkListProps = {
    uriHistory,
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>ImpGG - URL Shortener, Mischievous link helper</title>
        <meta
          name="description"
          content="Create shortened links that work for you and your business. ImpGG is your one stop shop for shortening links, creating QR codes, powerful link analytics, and custom branded domains. Try ImpGG for free now!"
        />
      </Helmet>
      <div className={classes.heroContent}>
        <Header
          userData={userData}
          loggedIn={loggedIn}
          logoutUser={onLogoutClick}
          background={false}
        />
        <Typography
          variant="h4"
          align="center"
          className={classes.heroHeadText}
        >
          Mischievously short links that work for you
        </Typography>
        <Typography variant="h4" align="center" className={classes.heroText}>
          Start creating and sharing links today
        </Typography>
        {loggedIn ? (
          <React.Fragment>
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="contained"
              className={classes.heroButton}
            >
              Go to dashboard
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              className={classes.heroButton}
            >
              Create a free account
            </Button>
          </React.Fragment>
        )}
      </div>
      <Container maxWidth="sm" component="main" className={classes.formContent}>
        <form className={classes.form} noValidate onSubmit={onSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="uri"
            label="Shorten your link"
            type="url"
            id="uri"
            error={!!uriValidation}
            helperText={uriValidation}
            onChange={onChangeURI}
          />
          <Typography variant="caption" align="right" color="textSecondary">
            {"By shortening a link, you are agreeing to ImpGG's "}
            <Link to="/terms" color="textSecondary" component={RouterLink}>
              Terms of Service
            </Link>
            {' and '}
            <Link to="/privacy" color="textSecondary" component={RouterLink}>
              Privacy Policy
            </Link>
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!!uriValidation}
          >
            Shorten it!
          </Button>
        </form>
      </Container>
      <Container maxWidth="md" component="div">
        {uriHistory.length >= 1 && <LinkList {...linkListProps} />}
      </Container>
      <Footer />
    </React.Fragment>
  );
}

HomePage.propTypes = {
  uri: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  uriValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  uriHistory: PropTypes.array,
  onLogoutClick: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeURI: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  uri: makeSelectURI(),
  uriHistory: makeSelectURIHistory(),
  uriValidation: makeSelectURIValidation(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
    },
    onChangeURI: evt => {
      dispatch(validateURI(evt.target.value));
      dispatch(changeURI(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchUrl());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
