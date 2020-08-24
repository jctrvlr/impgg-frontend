/**
 *
 * About Page
 *
 */

import React, { memo } from 'react';

import { FormattedMessage } from 'react-intl';

import { Link as RouterLink } from 'react-router-dom';

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

import Button from '@material-ui/core/Button';

import makeSelectAboutPage from './selectors';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';
import { logoutUser } from '../App/actions';

import reducer from './reducer';
import saga from './saga';

import messages from './messages';

import madeEasyImage from '../../images/madeeasy.png';
import metricsImage from '../../images/metrics.png';
import byobImage from '../../images/byob.png';

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
  section3: {
    margin: theme.spacing(0, 0, 10),
    textAlign: 'center',
  },
  sectionColumn: {
    [theme.breakpoints.down(769)]: {
      width: '100%',
      margin: theme.spacing(5, 0),
    },
    width: '50%',
    textAlign: 'center',
  },
}));

export function AboutPage({ userData, loggedIn, onLogoutClick }) {
  useInjectReducer({ key: 'about', reducer });
  useInjectSaga({ key: 'about', saga });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>About | ImpGG</title>
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
            <img src={madeEasyImage} alt="Link creation modal" width="90%" />
          </div>
          <div className={classes.sectionColumn}>
            <Typography component="h3" variant="h4" align="left" gutterBottom>
              <FormattedMessage {...messages.platformHeader} />
            </Typography>
            <Typography component="h4" variant="body1" align="left">
              <FormattedMessage {...messages.platformBody} />
            </Typography>
          </div>
        </div>

        <div className={classes.section2}>
          <div className={classes.sectionColumn}>
            <Typography component="h3" variant="h4" align="left" gutterBottom>
              <FormattedMessage {...messages.analyticsHeader} />
            </Typography>
            <Typography component="h4" variant="body1" align="left">
              <FormattedMessage {...messages.analyticsBody} />
            </Typography>
          </div>
          <div className={classes.sectionColumn}>
            <img
              src={metricsImage}
              alt="Use metrics to learn about your audience"
              width="90%"
            />
          </div>
        </div>

        <div className={classes.section2}>
          <div className={classes.sectionColumn}>
            <img
              src={byobImage}
              alt="Use your own domain to create recognizable links"
              width="90%"
            />
          </div>
          <div className={classes.sectionColumn}>
            <Typography component="h3" variant="h4" align="left" gutterBottom>
              <FormattedMessage {...messages.customHeader} />
            </Typography>
            <Typography component="h4" variant="body1" align="left">
              <FormattedMessage {...messages.customBody} />
            </Typography>
          </div>
        </div>

        <div className={classes.section3}>
          <Typography component="h3" variant="h4" align="center" gutterBottom>
            <FormattedMessage {...messages.privacyHeader} />
          </Typography>
          <Typography component="h4" variant="body1" align="center">
            <FormattedMessage {...messages.privacyBody} />
          </Typography>
        </div>

        <div className={classes.section3}>
          <Typography component="h3" variant="h4" align="center" gutterBottom>
            <FormattedMessage {...messages.ctaHeader} />
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/register"
          >
            <FormattedMessage {...messages.ctaButton} />
          </Button>
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
