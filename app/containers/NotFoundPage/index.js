/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';

import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { push } from 'connected-react-router';

import { makeStyles } from '@material-ui/core/styles';

import Logo from 'images/impgg-withquestionmarks.png';

import Footer from 'components/Footer';
import Header from 'components/Header';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeSelectUserData, makeSelectLoggedIn } from '../App/selectors';

import { logoutUser } from '../App/actions';

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
  logo: {
    height: 100,
    margin: 10,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    height: '75vh',
    textAlign: 'center',
  },
}));
export function NotFound({ userData, loggedIn, onLogoutClick }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>ImpGG - Page not found</title>
        <meta
          name="description"
          content="Oops! Somethin' went wrong somewhere. Sorry about that! ImpGG is your one stop shop for all things... short links. Mischievously short."
        />
      </Helmet>
      <Header
        userData={userData}
        loggedIn={loggedIn}
        logoutUser={onLogoutClick}
        background
      />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Link component={RouterLink} to="/">
          <img alt="ImpGG logo" src={Logo} className={classes.logo} />
        </Link>
        <Typography
          variant="h2"
          align="center"
          className={classes.heroHeadTopText}
        >
          whoopsies
        </Typography>
        <Typography
          variant="h5"
          align="center"
          className={classes.heroHeadText}
        >
          we couldn&#39;t find that page
        </Typography>
        <Typography
          variant="h4"
          align="center"
          className={classes.heroHeadText}
        >
          navigate back to&nbsp;
          <Link component={RouterLink} to="/">
            home
          </Link>
        </Typography>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
NotFound.propTypes = {
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loggedIn: PropTypes.bool,
  onLogoutClick: PropTypes.func,
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(NotFound);
