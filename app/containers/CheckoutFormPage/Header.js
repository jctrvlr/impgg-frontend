/**
 *
 * Header
 * TODO: Update menu icon margins at top as well as popdown menu that extends from avatar in drawer
 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import DarkToggle from 'components/DarkToggle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import { makeStyles } from '@material-ui/core/styles';

import DarkmodeLogo from 'images/logo-darkmode.png';

import PropTypes from 'prop-types';

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
  transparentAppbar: {
    background: '#E31837',
    boxShadow: 'none',
  },
  appBar: {
    background: '#E31837',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    [theme.breakpoints.down(1280)]: {
      display: 'none',
    },
  },
  toolbarMobile: {
    flexWrap: 'wrap',
    [theme.breakpoints.up(1280)]: {
      display: 'none',
    },
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  title: {
    [theme.breakpoints.up(768)]: {
      flex: '0 1 auto',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    marginLeft: '0%',
    color: '#fff',
  },
  logo: {
    height: 100,
    margin: 15,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  linkNoBackground: {
    margin: theme.spacing(1, 1.5),
    color: '#fff',
  },
  menu: {
    margin: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuIconR: {
    margin: 'auto',
  },
  menuIconButton: {
    width: 40,
    height: 40,
  },
  menuIconButtonNoBackground: {
    width: 40,
    height: 40,
    color: '#fff',
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
    width: 60,
    height: 60,
  },
  avatarNoBackground: {
    margin: theme.spacing(1, 1.5),
    width: 60,
    height: 60,
    color: '#fff',
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div id="nav-top" />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.transparentAppbar}
      >
        <Toolbar className={classes.toolbar}>
          <Link component={RouterLink} to="/" className={classes.toolbarTitle}>
            <img
              alt="ImpGG logo. Your friendly neighborhood link shortener"
              src={DarkmodeLogo}
              className={classes.logo}
            />
          </Link>
          <Typography variant="h3" className={classes.title}>
            Subscription Checkout
          </Typography>
          <DarkToggle />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header;
