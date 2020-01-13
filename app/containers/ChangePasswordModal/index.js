/**
 *
 * ChangePasswordModal
 *
 */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Logo from 'images/logo-withouttext.png';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import ErrorMessageHolder from 'components/ErrorMessageHolder';

import HeartIcon from '@material-ui/icons/Favorite';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectLoginEmail,
  makeSelectLoading,
  makeSelectPassword,
  makeSelectLoginError,
  makeSelectAuthSuccess,
  makeSelectChangeSuccess,
} from './selectors';
import { makeSelectUserData } from '../App/selectors';

import {
  changeLoginEmail,
  changePassword,
  authUser,
  updatePassword,
  resetState,
} from './actions';

import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  modalPaper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  domainLabel: {
    fontSize: '1rem',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em',
  },
  linkAdornment: {
    fontSize: '14px',
    width: '165px',
    padding: '6px 0 7px',
    paddingTop: '3px',
  },
  paper: {
    margin: theme.spacing(8, 0),
  },
}));

export function ChangePasswordModal({
  openModal,
  userData,
  authSuccess,
  loginError,
  handleModalClose,
  loginEmail,
  password,
  loading,
  changeSuccess,
  onChangeLoginEmail,
  onChangePassword,
  onSubmitForm,
  onSubmitPasswordForm,
  snackBarReset,
}) {
  useInjectReducer({ key: 'changePasswordModal', reducer });
  useInjectSaga({ key: 'changePasswordModal', saga });

  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (changeSuccess) {
      enqueueSnackbar('Password updated successfully', { variant: 'success' });
      handleModalClose();
      snackBarReset();
    }
  }, [changeSuccess]);

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      open={openModal}
      onClose={handleModalClose}
      aria-labelledby="form-dialog-title"
    >
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={handleModalClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Container component="main" maxWidth="xs">
          {authSuccess ? (
            <div className={classes.paper}>
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
                >
                  Save password
                </Button>
                <ErrorMessageHolder error={loginError} />
              </form>
            </div>
          ) : (
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Log in
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
                  onChange={onChangeLoginEmail}
                />
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
                >
                  Log In
                </Button>
                <ErrorMessageHolder error={loginError} />
              </form>
            </div>
          )}
        </Container>
      </DialogContent>
    </Dialog>
  );
}

ChangePasswordModal.propTypes = {
  openModal: PropTypes.bool,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  authSuccess: PropTypes.bool,
  handleModalClose: PropTypes.func,
  loginEmail: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loginError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loading: PropTypes.bool,
  changeSuccess: PropTypes.bool,
  onChangeLoginEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onSubmitForm: PropTypes.func,
  onSubmitPasswordForm: PropTypes.func,
  snackBarReset: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  authSuccess: makeSelectAuthSuccess(),
  userData: makeSelectUserData(),
  loginEmail: makeSelectLoginEmail(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
  loginError: makeSelectLoginError(),
  changeSuccess: makeSelectChangeSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeLoginEmail: evt => {
      dispatch(changeLoginEmail(evt.target.value));
    },
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(authUser());
    },
    onSubmitPasswordForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(updatePassword());
    },
    snackBarReset: () => {
      dispatch(resetState());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangePasswordModal);
