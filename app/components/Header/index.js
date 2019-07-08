/**
 *
 * Header
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import DarkToggle from 'components/DarkToggle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import messages from './messages';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  iconbutton: {
    padding: 0,
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
  menu: {
    margin: 0,
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <React.Fragment>
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
            component={RouterLink}
            to="/"
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
          <DarkToggle />
          <Button
            component={RouterLink}
            to="/login"
            color="primary"
            variant="contained"
            className={classes.link}
          >
            Sign in
          </Button>
          <Button
            component={RouterLink}
            to="/register"
            color="primary"
            variant="contained"
            className={classes.link}
          >
            Register an account
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
