/**
 *
 * ContactPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import ErrorMessageHolder from 'components/ErrorMessageHolder';

import Footer from 'components/Footer';
import Header from 'components/Header';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import {
  makeSelectUserData,
  makeSelectLoggedIn,
  makeSelectEmailValidation,
} from '../App/selectors';
import { logoutUser, validateEmail } from '../App/actions';

import {
  makeSelectError,
  makeSelectEmail,
  makeSelectMessageSuccess,
  makeSelectLoading,
} from './selectors';
import {
  changeEmail,
  changeSubject,
  changeMessage,
  sendMessage,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  header: {
    textAlign: 'center',
    margin: theme.spacing(0, 0, 3),
  },
  suggestions: {
    fontSize: '2em',
    margin: theme.spacing(0, 0, 2),
  },
  pricingContainer: {
    marginBottom: theme.spacing(15),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: 'inherit',
  },
}));

export function ContactPage({
  userData,
  loggedIn,
  onLogoutClick,
  onSubmitForm,
  emailValidation,
  onChangeEmail,
  onChangeSubject,
  onChangeMessage,
  email,
  error,
  loading,
  messageSuccess,
}) {
  useInjectReducer({ key: 'contactPage', reducer });
  useInjectSaga({ key: 'contactPage', saga });

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (loggedIn) {
      onChangeEmail({ target: { value: userData.user.email } });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (messageSuccess) {
      enqueueSnackbar('Your message was sent!', { variant: 'success' });
    }
  }, [messageSuccess]);

  return (
    <div>
      <Helmet>
        <title>Contact - ImpGG</title>
        <meta
          name="description"
          content="Contact page - Create shortened links that work for you and your business. ImpGG is your one stop shop for shortening links, creating QR codes, powerful link analytics, and custom branded domains. Try ImpGG for free now!"
        />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
      />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h3" className={classes.header}>
          Get help or have a suggestion?
        </Typography>
        <Divider variant="middle" />
        {/*
        <div className={classes.suggestions}>
          <Typography variant="body">Tweet at us</Typography>
        </div>
        <div className={classes.suggestions}>
          <Typography variant="body">
            Email us directly at&nbsp;
            <a className={classes.link} href="mailto:support@imp.gg">
              support@imp.gg
            </a>
          </Typography>
        </div>
        */}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            error={!!emailValidation}
            helperText={emailValidation}
            onChange={onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="subject"
            label="Subject"
            name="subject"
            autoFocus
            onChange={onChangeSubject}
          />
          <TextField
            id="message"
            label="Message"
            margin="normal"
            fullWidth
            multiline
            required
            rows={4}
            onChange={onChangeMessage}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading || messageSuccess}
            onClick={onSubmitForm}
          >
            Send message
          </Button>
          <ErrorMessageHolder error={error} />
        </form>
      </Container>

      <Footer />
    </div>
  );
}
/*
userData,
  loggedIn,
  onLogoutClick,
  onSubmitForm,
  emailValidation,
  onChangeEmail,
  onChangeSubject,
  onChangeMessage,
  error,
*/
ContactPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
  onSubmitForm: PropTypes.func,
  emailValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChangeEmail: PropTypes.func,
  onChangeSubject: PropTypes.func,
  onChangeMessage: PropTypes.func,
  email: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  messageSuccess: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  error: makeSelectError(),
  email: makeSelectEmail(),
  emailValidation: makeSelectEmailValidation(),
  messageSuccess: makeSelectMessageSuccess(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
    },
    onChangeEmail: evt => {
      dispatch(validateEmail(evt.target.value));
      dispatch(changeEmail(evt.target.value));
    },
    onChangeSubject: evt => {
      dispatch(changeSubject(evt.target.value));
    },
    onChangeMessage: evt => {
      dispatch(changeMessage(evt.target.value));
    },
    onSubmitForm: () => {
      dispatch(sendMessage());
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
)(ContactPage);
