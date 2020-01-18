/**
 *
 * ProfilePage
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { useSnackbar } from 'notistack';
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
import Button from '@material-ui/core/Button';

import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

// import Fade from '@material-ui/core/Fade';
// import CircularProgress from '@material-ui/core/CircularProgress';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

import { makeSelectEmail } from './selectors';

import reducer from './reducer';
import saga from './saga';
import { changeEmail } from './actions';
import ChangePasswordModal from '../ChangePasswordModal';
import SettingsTabs from '../../components/SettingsTabs';

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
  verifiedEmail: {
    paddingLeft: theme.spacing(3),
  },
  changePasswordButton: {
    display: 'block',
    margin: theme.spacing(2, 0),
  },
}));

export function SecurityPage({
  userData,
  loggedIn,
  email,
  onLogoutClick,
  onLoadUnauth,
  onChangeEmail,
}) {
  useInjectReducer({ key: 'securityPage', reducer });
  useInjectSaga({ key: 'securityPage', saga });

  // const { enqueueSnackbar } = useSnackbar();

  if (!loggedIn) {
    onLoadUnauth();
  }

  useEffect(() => {
    const evtOnce = { target: { value: userData.user.email } };
    onChangeEmail(evtOnce);
  }, []);

  const [editEmail, seteditEmail] = React.useState(false);

  const handleEditEmailClick = () => {
    seteditEmail(!editEmail);
    if (editEmail) {
      const evt = { target: { value: userData.user.email } };
      onChangeEmail(evt);
    }
  };
  const [openPasswordModal, setOpenPasswordModal] = React.useState(false);

  const handleModalOpen = () => {
    setOpenPasswordModal(true);
  };

  const handleModalClose = () => {
    setOpenPasswordModal(false);
  };

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
        <SettingsTabs tabValue={1} />
      </Container>
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <div className={classes.nameSection}>
          <Typography variant="h4" align="left" className={classes.heroText}>
            Contact
          </Typography>
          <Typography variant="caption" align="left">
            Where should we send you messages about your account
          </Typography>
          <TextField
            autoFocus
            variant="standard"
            margin="dense"
            id="email"
            label="Email"
            key="email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            disabled={!editEmail}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle edit email"
                    onClick={handleEditEmailClick}
                  >
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
          />
          <Typography
            variant="caption"
            align="left"
            className={classes.verifiedEmail}
          >
            {/* TODO: */}Your email is <strong>Verified</strong>
          </Typography>
          {editEmail ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.saveButton}
            >
              Save
            </Button>
          ) : null}
        </div>
        <Divider variant="fullWidth" className={classes.divider} />
        <div className={classes.nameSection}>
          <Typography variant="h4" align="left" className={classes.heroText}>
            Security
          </Typography>
          <Typography variant="caption" align="left">
            Update security settings
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.changePasswordButton}
            onClick={handleModalOpen}
          >
            Change password
          </Button>
          <ChangePasswordModal
            openModal={openPasswordModal}
            handleModalClose={handleModalClose}
          />
          {/* TODO: Two factor authentication */}
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

SecurityPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onLogoutClick: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  onChangeEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  email: makeSelectEmail(),
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
    onChangeEmail: evt => {
      dispatch(changeEmail(evt.target.value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SecurityPage);
