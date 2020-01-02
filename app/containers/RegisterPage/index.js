/* eslint-disable no-unused-vars */
/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import { push } from 'connected-react-router';
import { Link as RouterLink } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Logo from 'images/logo-withouttext.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ErrorMessageHolder from 'components/ErrorMessageHolder';

import HeartIcon from '@material-ui/icons/Favorite';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectRegisterPage,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectEmailValidation,
} from './selectors';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectUserData,
  makeSelectLoggedIn,
} from '../App/selectors';

import {
  changeFirstName,
  changeLastName,
  changeEmail,
  changePassword,
  validateEmail,
} from './actions';

import { registerUser } from '../App/actions';

import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Made with '} <HeartIcon /> {' on Earth'}
    </Typography>
  );
}

function TermsAndPrivacy() {
  return (
    <Typography variant="caption" align="right" color="textSecondary">
      {"I agree to ImpGG's "}
      <Link
        target="_blank"
        to="/terms"
        color="textSecondary"
        component={RouterLink}
      >
        Terms of Service
      </Link>
      {' and '}
      <Link
        target="_blank"
        to="/privacy"
        color="textSecondary"
        component={RouterLink}
      >
        Privacy Policy
      </Link>
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    margin: 10,
    marginBottom: 33,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function RegisterPage({
  firstName,
  lastName,
  email,
  password,
  loading,
  loggedIn,
  error,
  userData,
  onSubmitForm,
  loggedInRedirect,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  onChangePassword,
  emailValidation,
}) {
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'registerPage', saga });
  const classes = useStyles();

  if (loggedIn) {
    loggedInRedirect();
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div>
      <Helmet>
        <title>ImpGG - Register</title>
        <meta name="description" content="Description of RegisterPage" />
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={onChangeFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={onChangeLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!emailValidation}
                  helperText={emailValidation}
                  onChange={onChangeEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  onChange={onChangePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Checkbox value="allowExtraEmails" color="primary" />
                <TermsAndPrivacy />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <ErrorMessageHolder error={error} />
            <Grid container justify="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    </div>
  );
}

RegisterPage.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  loggedInRedirect: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  emailValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
  loading: makeSelectLoading(),
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
  email: makeSelectEmail(),
  password: makeSelectPassword(),
  error: makeSelectError(),
  emailValidation: makeSelectEmailValidation(),
});

function mapDispatchToProps(dispatch) {
  return {
    loggedInRedirect: evt => {
      dispatch(push('/'));
    },
    onChangeEmail: evt => {
      dispatch(validateEmail(evt.target.value));
      dispatch(changeEmail(evt.target.value));
    },
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onChangeFirstName: evt => dispatch(changeFirstName(evt.target.value)),
    onChangeLastName: evt => dispatch(changeLastName(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(registerUser());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RegisterPage);
