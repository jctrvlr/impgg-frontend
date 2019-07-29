/* eslint-disable no-unused-vars */
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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import makeSelectHomePage, {
  makeSelectURI,
  makeSelectURIValidation,
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Shorten it!
          </Button>
        </form>
      </Container>
    </div>
  );
}

HomePage.propTypes = {
  uri: PropTypes.string,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  uriValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLogoutClick: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeURI: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage(),
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  uri: makeSelectURI(),
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
