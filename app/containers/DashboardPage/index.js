/* eslint-disable no-underscore-dangle */
/**
 *
 * Dashboard
 *
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route, Link as RouterLink } from 'react-router-dom';

// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Footer from 'components/Footer';

import Header from './Header';
import Table from './table';

import makeSelectDashboard, {
  makeSelectAlerts,
  makeSelectTableData,
  makeSelectLoading,
  makeSelectNewLink,
  makeSelectTableArchive,
} from './selectors';
import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import reducer from './reducer';
import saga from './saga';

import {
  getTableData,
  changeSelectedData,
  changeTableArchive,
  archiveLink,
} from './actions';

import { logoutUser } from '../App/actions';

import TableItemDialog from '../TableItemDialog';
import LinkCreationDialog from '../LinkCreationDialog';
// import messages from './messages';

const drawerWidth = 240;

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
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  formContent: {
    minHeight: '90vh',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuLeft: {
    height: '94px',
  },
  newLinkButton: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: '99999',
  },
}));

export function DashboardPage({
  match,
  userData,
  tableData,
  loggedIn,
  loading,
  newLink,
  onLogoutClick,
  onLoadUnauth,
  onChangeSelected,
  onArchiveChange,
  onArchive,
  onLoad,
  alerts,
  tableArchived,
}) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const classes = useStyles();

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (newLink) {
      onLoad();
    }
  }, [newLink]);

  if (!loggedIn) {
    onLoadUnauth();
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Dashboard - ImpGG</title>
        <meta
          name="description"
          content="Create shortened links that work for you and your business. ImpGG is your one stop shop for shortening links, creating QR codes, powerful link analytics, and custom branded domains. Try ImpGG for free now!"
        />
      </Helmet>
      <Button
        className={classes.newLinkButton}
        variant="contained"
        color="primary"
        to="/dashboard/create"
        component={RouterLink}
      >
        +
      </Button>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
        alerts={alerts}
      />

      {/* Start of dashboard main */}
      <Container maxWidth="xl" component="main" className={classes.formContent}>
        <Table
          tableData={tableData}
          onChangeSelected={onChangeSelected}
          archived={tableArchived}
          onArchiveChange={onArchiveChange}
          onArchive={onArchive}
          reloadLinks={onLoad}
          loading={loading}
        />
      </Container>
      <Footer />
      <Route
        path={`${match.url}/create`}
        render={props => <LinkCreationDialog {...props} openModal />}
      />
      <Route
        path={`${match.url}/link/:id`}
        render={props => <TableItemDialog {...props} open />}
      />
    </React.Fragment>
  );
}

DashboardPage.propTypes = {
  match: PropTypes.object,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tableData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  newLink: PropTypes.bool,
  onLogoutClick: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  onChangeSelected: PropTypes.func,
  onArchiveChange: PropTypes.func,
  onArchive: PropTypes.func,
  onLoad: PropTypes.func,
  alerts: PropTypes.array,
  tableArchived: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  loggedIn: makeSelectLoggedIn(),
  loading: makeSelectLoading(),
  newLink: makeSelectNewLink(),
  userData: makeSelectUserData(),
  tableData: makeSelectTableData(),
  alerts: makeSelectAlerts(),
  tableArchived: makeSelectTableArchive(),
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
    onLoad: () => {
      dispatch(getTableData());
    },
    onChangeSelected: selectedData => {
      dispatch(changeSelectedData(selectedData));
      dispatch(push(`/dashboard/link/${selectedData[0]._id}`));
    },
    onArchiveChange: () => {
      dispatch(changeTableArchive());
      dispatch(getTableData());
    },
    onArchive: linkId => {
      dispatch(archiveLink(linkId));
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
)(DashboardPage);
