/**
 *
 * SigninPage
 *
 */

import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { useSnackbar } from 'notistack';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Logo from 'images/logo-withouttext.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ErrorMessageHolder from 'components/ErrorMessageHolder';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import HeartIcon from '@material-ui/icons/Favorite';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectEmailValidation,
  makeSelectResetPasswordMessage,
  makeSelectLoading,
  makeSelectTok,
} from './selectors';

import { makeSelectLoggedIn } from '../App/selectors';

import reducer from './reducer';
import saga from './saga';
import {
  changeEmail,
  validateEmail,
  resetPassword,
  changeTok,
  changePassword,
  setNewPassword,
} from './actions';
// import messages from './messages';

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Made with '} <HeartIcon /> {' on Earth'}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function ResetPasswordPage({
  loading,
  loggedIn,
  tok,
  loggedInRedirect,
  onSubmitForm,
  onChangeEmail,
  emailValidation,
  resetPasswordMessage,
  changeSuccess,
  onSubmitPasswordForm,
  onChangePassword,
  onChangeTok,
}) {
  useInjectReducer({ key: 'resetPasswordPage', reducer });
  useInjectSaga({ key: 'resetPasswordPage', saga });

  const classes = useStyles();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (changeSuccess) {
      enqueueSnackbar('Password updated successfully', { variant: 'success' });
    }
  }, [changeSuccess]);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  useEffect(() => {
    const query = queryString.parse(location.search);
    console.log(query);
    onChangeTok(query.tok);
  }, [location]);

  if (loggedIn) {
    loggedInRedirect();
  }

  return (
    <div>
      <Helmet>
        <title>ImpGG - Forgot Password</title>
        <meta
          name="description"
          content="Log in to ImpGG -- Your mischievously short link shortener."
        />
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
          {tok ? (
            <React.Fragment>
              <Typography component="h1" variant="h5">
                Change Password
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={onSubmitPasswordForm}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={resetPasswordMessage}
                >
                  Save password
                </Button>
                <ErrorMessageHolder error={resetPasswordMessage} />
              </form>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography component="h1" variant="h4">
                Recover your account
              </Typography>
              <Typography variant="body1" align="center">
                Enter your email so we can send you a link to reset your
                password
              </Typography>
              <form className={classes.form} noValidate onSubmit={onSubmitForm}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!emailValidation}
                  helperText={emailValidation}
                  onChange={onChangeEmail}
                />
                {loading ? (
                  <Fade
                    in={loading}
                    style={{
                      transitionDelay: loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                  >
                    <CircularProgress />
                  </Fade>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={resetPasswordMessage || tok}
                  >
                    Send recovery password
                  </Button>
                )}
                <ErrorMessageHolder error={resetPasswordMessage} />
              </form>
            </React.Fragment>
          )}
        </div>
        <Box mt={5}>
          <MadeWithLove />
        </Box>
      </Container>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  loading: PropTypes.bool,
  loggedIn: PropTypes.bool,
  loggedInRedirect: PropTypes.func,
  tok: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  onChangeEmail: PropTypes.func,
  emailValidation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  changeSuccess: PropTypes.string,
  resetPasswordMessage: PropTypes.string,
  onChangeTok: PropTypes.func,
  onChangePassword: PropTypes.func,
  onSubmitPasswordForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  tok: makeSelectTok(),
  loggedIn: makeSelectLoggedIn(),
  resetPasswordMessage: makeSelectResetPasswordMessage(),
  emailValidation: makeSelectEmailValidation(),
});

function mapDispatchToProps(dispatch) {
  return {
    loggedInRedirect: () => {
      dispatch(push('/'));
    },
    onChangeEmail: evt => {
      dispatch(validateEmail(evt.target.value));
      dispatch(changeEmail(evt.target.value));
    },
    onChangeTok: tok => {
      dispatch(changeTok(tok));
    },
    onChangePassword: evt => {
      dispatch(changePassword(evt.target.value));
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(resetPassword());
    },
    onSubmitPasswordForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(setNewPassword());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ResetPasswordPage);
