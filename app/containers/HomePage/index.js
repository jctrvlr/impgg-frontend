/* eslint-disable no-unused-vars */
/**
 *
 * HomePage
 *
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
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
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
      {/* TODO: Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
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
          >
            Shorten it!
          </Button>
          {uriHistory.length >= 1 && <LinkList uriHistory={uriHistory} />}
        </form>
      </Container>
    </div>
  );
}

HomePage.propTypes = {
  uri: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  uriValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  uriHistory: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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
