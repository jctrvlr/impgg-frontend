/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';
import Table from './table';

import makeSelectDashboard, {
  makeSelectAlerts,
  makeSelectTableData,
} from './selectors';
import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import reducer from './reducer';
import saga from './saga';

import { getTableData } from './actions';
import { logoutUser } from '../App/actions';
// import messages from './messages';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  menuLeft: {
    height: '94px',
  },
}));

export function DashboardPage({
  userData,
  tableData,
  loggedIn,
  onLogoutClick,
  onLoadUnauth,
  onLoad,
  alerts,
}) {
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const classes = useStyles();

  useEffect(() => {
    onLoad();
  }, []);

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
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
        alerts={alerts}
      />

      {/* Start of dashboard main */}
      <Container maxWidth="xl" component="main" className={classes.formContent}>
        <Table tableData={tableData} />
      </Container>
    </React.Fragment>
  );
}

DashboardPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  tableData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  onLoad: PropTypes.func,
  alerts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  tableData: makeSelectTableData(),
  alerts: makeSelectAlerts(),
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardPage);
