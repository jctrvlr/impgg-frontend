/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/**
 *
 * DomainsPage
 *
 */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useSnackbar } from 'notistack';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'connected-react-router';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Typography from '@material-ui/core/Typography';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

import {
  makeSelectClickCount,
  makeSelectClickLinkFilter,
  makeSelectUserLinks,
  makeSelectGetReport,
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import {
  getClickReport,
  setClickCountOption,
  setClickLinkFilter,
  getUsersLink,
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
  paper: {
    marginTop: theme.spacing(8),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing(2),
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
  linkFilterInput: {
    margin: theme.spacing(2, 3),
    width: '200px',
  },
  linkFilterLabel: {
    margin: theme.spacing(0, 3),
  },
  reportTitle: {
    margin: theme.spacing(2, 2, 0),
  },
  reportDescription: {
    margin: theme.spacing(1, 3, 0),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  reportInfo: {
    margin: theme.spacing(3, 0),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, clickLinkFilter, theme) {
  return {
    fontWeight:
      clickLinkFilter.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function ReportsPage({
  userData,
  loggedIn,
  getReport,
  clickCount,
  userLinks,
  onLogoutClick,
  onLoadUnauth,
  onLoad,
  clickLinkFilter,
  onChangeSetClickCount,
  onChangeLinkFilter,
  onGetClickReport,
}) {
  useInjectReducer({ key: 'reportsPage', reducer });
  useInjectSaga({ key: 'reportsPage', saga });

  // eslint-disable-next-line no-unused-vars
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  if (!loggedIn) {
    onLoadUnauth();
  }

  useEffect(() => {
    onLoad();
  }, []);

  useEffect(() => {
    if (getReport) {
      enqueueSnackbar('Report request received. Check your email for report', {
        variant: 'success',
      });
    }
  }, [getReport]);

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
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Paper className={classes.paper}>
          <div className={classes.reportInfo}>
            <Typography variant="h5" className={classes.reportTitle}>
              Click Report Options
            </Typography>
            <Typography variant="caption" className={classes.reportDescription}>
              Export the last {clickCount} clicks for your link(s)
            </Typography>
          </div>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputLabel
                  id="link-filter"
                  className={classes.linkFilterLabel}
                >
                  Choose the link(s)
                </InputLabel>
                <Select
                  labelId="link-filter"
                  id="linkFilter"
                  className={classes.linkFilterInput}
                  multiple
                  value={clickLinkFilter}
                  onChange={onChangeLinkFilter}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {userLinks.map(link => (
                    <MenuItem
                      key={link.pageTitle}
                      value={link._id}
                      style={getStyles(link._id, clickLinkFilter, theme)}
                    >
                      {link.pageTitle}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="last-links-label">Click Count</InputLabel>
                  <Select
                    labelId="last-links-label"
                    id="last-links-label"
                    value={clickCount}
                    onChange={onChangeSetClickCount}
                  >
                    <MenuItem value={100}>100</MenuItem>
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={10000}>10000</MenuItem>
                  </Select>
                  <FormHelperText>
                    The last {clickCount} clicks will be included in the report
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onGetClickReport}
                disabled={clickLinkFilter.length === 0 || getReport}
              >
                Generate Click Report
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

ReportsPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  getReport: PropTypes.bool,
  clickCount: PropTypes.number,
  userLinks: PropTypes.array,
  clickLinkFilter: PropTypes.array,
  onLogoutClick: PropTypes.func,
  onLoadUnauth: PropTypes.func,
  onChangeSetClickCount: PropTypes.func,
  onLoad: PropTypes.func,
  onGetClickReport: PropTypes.func,
  onChangeLinkFilter: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
  getReport: makeSelectGetReport(),
  clickCount: makeSelectClickCount(),
  clickLinkFilter: makeSelectClickLinkFilter(),
  userLinks: makeSelectUserLinks(),
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
    onChangeSetClickCount: evt => {
      dispatch(setClickCountOption(evt.target.value));
    },
    onChangeLinkFilter: evt => {
      dispatch(setClickLinkFilter(evt.target.value));
    },
    onLoad: () => {
      dispatch(getUsersLink());
    },
    onGetClickReport: evt => {
      evt.preventDefault();
      dispatch(getClickReport());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportsPage);
