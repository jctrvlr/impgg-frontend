/**
 *
 * About Page
 *
 */

import React, { memo } from 'react';

import { FormattedMessage } from 'react-intl';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'connected-react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Header from 'components/Header/index';
import Footer from 'components/Footer';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import makeSelectAboutPage from './selectors';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

import reducer from './reducer';
import saga from './saga';

import messages from './messages';

const useStyles = makeStyles(theme => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    minHeight: '90vh',
  },
  section1: {
    margin: theme.spacing(0, 0, 10),
  },
  section2: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: theme.spacing(8, 5, 10),
  },
  sectionColumn: {
    [theme.breakpoints.down(769)]: {
      width: '100%',
    },
    width: '50%',
  },
}));

export function AboutPage({ userData, loggedIn, onLogoutClick }) {
  useInjectReducer({ key: 'about', reducer });
  useInjectSaga({ key: 'about', saga });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>ImpGG - URL shortener, mischievous link helper</title>
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
        <div className={classes.section1}>
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            <FormattedMessage {...messages.levelUpHeader} />
          </Typography>
          <Typography component="h2" variant="h5" align="center">
            <FormattedMessage {...messages.whoWeAre} />
          </Typography>
        </div>

        <Divider />

        <div className={classes.section2}>
          <div className={classes.sectionColumn}>
            <Typography component="h3" variant="h4" align="left" gutterBottom>
              <FormattedMessage {...messages.levelUpHeader} />
            </Typography>
            <Typography component="h2" variant="h6" align="left">
              <FormattedMessage {...messages.whoWeAre} />
            </Typography>
          </div>
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
}

AboutPage.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  aboutPage: makeSelectAboutPage(),
  loggedIn: makeSelectLoggedIn(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLogoutClick: () => {
      dispatch(logoutUser());
      dispatch(push('/'));
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
)(AboutPage);
