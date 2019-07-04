/**
 *
 * Header
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import messages from './messages';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            ImpGG
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/about"
              className={classes.link}
            >
              <FormattedMessage {...messages.about} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/features"
              className={classes.link}
            >
              <FormattedMessage {...messages.features} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/pricing"
              className={classes.link}
            >
              <FormattedMessage {...messages.pricing} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/resources"
              className={classes.link}
            >
              <FormattedMessage {...messages.resources} />
            </Link>
          </nav>
          <Button
            component={RouterLink}
            to="/login"
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {};

export default Header;
