/**
 *
 * ProfilePage
 *
 */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'connected-react-router';

import { makeStyles } from '@material-ui/core/styles';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import DeleteIcon from '@material-ui/icons/Delete';

import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

import {
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectUpdateLoading,
  makeSelectUpdateProfileInfoSuccess,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  changeFirstName,
  changeLastName,
  removeProfilePicture,
  updateProfileInfo,
} from './actions';

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
  heroContent: {
    padding: theme.spacing(1, 0),
    minHeight: '75vh',
    overflow: 'auto',
  },
  heroHeadTopText: {
    paddingTop: '25%',
  },
  nameSection: {
    margin: theme.spacing(3),
    padding: theme.spacing(0, 6),
  },
  paperText: {
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
    width: 100,
    height: 100,
  },
  avatarContainer: {
    display: 'flex',
  },
  pictureButton: {
    height: '25%',
    alignSelf: 'center',
  },
  saveButton: {
    height: '25%',
    float: 'right',
    margin: theme.spacing(2, 0),
  },
  pictureDeleteButton: {
    color: theme.palette.text.primary,
    height: '25%',
    alignSelf: 'center',
  },
  divider: {
    clear: 'both',
  },
  settingsMain: {
    padding: theme.spacing(2, 0),
  },
}));

function LinkTab(props) {
  return <Tab component={RouterLink} {...props} />;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, updateFunction) {
  /**
   * Alert if clicked on outside of element
   */
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      updateFunction();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

export function ProfilePage({
  firstName,
  lastName,
  userData,
  loggedIn,
  updateProfileInfoSuccess,
  updateLoading,
  onLogoutClick,
  onChangeFirstName,
  onChangeLastName,
  onLoadUnauth,
  onSaveName,
  onProfilePictureDelete,
}) {
  useInjectReducer({ key: 'profilePage', reducer });
  useInjectSaga({ key: 'profilePage', saga });

  const { enqueueSnackbar } = useSnackbar();
  if (!loggedIn) {
    onLoadUnauth();
  }

  const [updatedNameInfo, setupdatedNameInfo] = React.useState(false);

  useEffect(() => {
    let evtOnce = { target: { value: userData.user.profile.firstName } };
    onChangeFirstName(evtOnce);
    evtOnce = { target: { value: userData.user.profile.lastName } };
    onChangeLastName(evtOnce);
  }, []);

  useEffect(() => {
    if (firstName && firstName !== userData.user.profile.firstName) {
      setupdatedNameInfo(true);
    } else if (lastName && lastName !== userData.user.profile.lastName) {
      setupdatedNameInfo(true);
    } else {
      setupdatedNameInfo(false);
    }
  }, [firstName, lastName]);

  useEffect(() => {
    if (updateProfileInfoSuccess && !updateLoading) {
      enqueueSnackbar('Profile Updated', { variant: 'success' });
      setupdatedNameInfo(false);
    }
  }, [updateProfileInfoSuccess]);

  const userAvatar = userData.user.profile.picture
    ? userData.user.profile.picture
    : false;

  const resetFirstName = () => {
    const evtOnce = { target: { value: userData.user.profile.firstName } };
    onChangeFirstName(evtOnce);
  };

  const resetLastName = () => {
    const evtOnce = { target: { value: userData.user.profile.lastName } };
    onChangeLastName(evtOnce);
  };

  const firstNameRef = useRef(null);
  useOutsideAlerter(firstNameRef, resetFirstName);
  const lastNameRef = useRef(null);
  useOutsideAlerter(lastNameRef, resetLastName);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>Settings - ImpGG</title>
        <meta
          name="description"
          content="Create shortened links that work for you and your business. ImpGG is your one stop shop for shortening links, creating QR codes, powerful link analytics, and custom branded domains. Try ImpGG for free now!"
        />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
      />
      <Container maxWidth="md">
        <Typography variant="h3" align="left" className={classes.settingsMain}>
          Settings
        </Typography>
        <AppBar
          position="static"
          className={classes.settingsTabs}
          component="div"
        >
          <Tabs variant="fullWidth" aria-label="nav tabs example" value={0}>
            <LinkTab label="Profile" to="/settings/profile" />
            <LinkTab label="Security and Privacy" to="/settings/security" />
            <LinkTab label="Connections" to="/settings/connections" />
          </Tabs>
        </AppBar>
      </Container>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <div className={classes.nameSection}>
          <Typography variant="h4" align="left" className={classes.heroText}>
            Profile Settings
          </Typography>
          <Typography variant="caption" align="left">
            Change identifying details for your account
          </Typography>
          <TextField
            ref={firstNameRef}
            autoFocus
            variant="outlined"
            margin="dense"
            id="firstName"
            label="First Name"
            key="firstName"
            value={firstName}
            onChange={onChangeFirstName}
            fullWidth
          />
          <TextField
            ref={lastNameRef}
            variant="outlined"
            margin="dense"
            id="lastName"
            label="Last Name"
            key="lastName"
            value={lastName}
            onChange={onChangeLastName}
            fullWidth
          />
          {updateLoading ? (
            <Fade
              in={updateLoading}
              style={{
                transitionDelay: updateLoading ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.saveButton}
              disabled={!updatedNameInfo}
              onClick={onSaveName}
            >
              Save Changes
            </Button>
          )}
        </div>
        <Divider variant="fullWidth" className={classes.divider} />
        <div className={classes.nameSection}>
          <Typography variant="h4" align="left" className={classes.heroText}>
            Profile Picture
          </Typography>
          <Typography variant="caption" align="left">
            Change profile picture
          </Typography>
          <div className={classes.avatarContainer}>
            {userAvatar ? (
              <Avatar
                src={userAvatar}
                alt="Profile Picture"
                className={classes.avatar}
              />
            ) : (
              <Avatar alt="Profile Picture" className={classes.avatar}>
                {userData.user.profile.firstName.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.pictureButton}
            >
              Update Profile Picture
            </Button>
            {userAvatar ? (
              <Button
                className={classes.pictureDeleteButton}
                onClick={onProfilePictureDelete}
              >
                <DeleteIcon />
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

ProfilePage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  firstName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  lastName: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  updateProfileInfoSuccess: PropTypes.bool,
  updateLoading: PropTypes.bool,
  onLogoutClick: PropTypes.func,
  onChangeFirstName: PropTypes.func,
  onChangeLastName: PropTypes.func,
  onSaveName: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  onProfilePictureDelete: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  firstName: makeSelectFirstName(),
  lastName: makeSelectLastName(),
  updateLoading: makeSelectUpdateLoading(),
  updateProfileInfoSuccess: makeSelectUpdateProfileInfoSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
    },
    onLoadUnauth: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
    },
    onChangeFirstName: evt => {
      dispatch(changeFirstName(evt.target.value));
    },
    onChangeLastName: evt => {
      dispatch(changeLastName(evt.target.value));
    },
    onProfilePictureDelete: () => {
      dispatch(removeProfilePicture());
    },
    onSaveName: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(updateProfileInfo());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfilePage);
