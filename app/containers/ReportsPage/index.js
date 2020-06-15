/* eslint-disable no-unused-vars */
/**
 *
 * DomainsPage
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
// import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

// import {} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  getClickReport,
  setClickCountOption,
  setClickLinkFilter,
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
    minHeight: '90vh',
    flexGrow: 1,
    padding: theme.spacing(3),
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
  newLinkButton: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: '99999',
  },
}));

export function ReportsPage({
  userData,
  loggedIn,
  onLogoutClick,
  onLoadUnauth,
  onChangeSetClickCount,
}) {
  useInjectReducer({ key: 'reportsPage', reducer });
  useInjectSaga({ key: 'reportsPage', saga });

  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();

  if (!loggedIn) {
    onLoadUnauth();
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>Reports - ImpGG</title>
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
      <Container maxWidth="xl" component="main" className={classes.heroContent}>
        Reports placeholder
      </Container>
      <Footer />
    </React.Fragment>
  );
}

ReportsPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  onChangeSetClickCount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
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
    onChangeSetClickCount: count => {
      dispatch(setClickCountOption(count));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportsPage);
