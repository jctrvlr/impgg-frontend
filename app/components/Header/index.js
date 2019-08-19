/**
 *
 * Header
 * TODO: Darkmode logo? Add in menu that comes off avatar for logged in users
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import DarkToggle from 'components/DarkToggle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Logo from 'images/logo.png';
import DarkmodeLogo from 'images/logo-darkmode.png';

import PropTypes from 'prop-types';

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
  transparentAppbar: {
    background: 'transparent',
    boxShadow: 'none',
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

function Header({ loggedIn, userData, logoutUser, background }) {
  const classes = useStyles();

  const userAvatar = userData.picture || 'https://i.pravatar.cc/300';
  const userName = userData.name || userData.email || 'Placeholder';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const appBarClass = background ? classes.appBar : classes.transparentAppbar;
  const fontBarClass = background ? classes.link : classes.linkNoBackground;
  const avatarClass = background ? classes.avatar : classes.avatarNoBackground;
  const logoB = background ? Logo : DarkmodeLogo;

  return (
    <React.Fragment>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={appBarClass}
      >
        <Toolbar className={classes.toolbar}>
          <Link component={RouterLink} to="/" className={classes.toolbarTitle}>
            <img
              alt="ImpGG logo. Your friendly neighborhood link shortener"
              src={logoB}
              className={classes.logo}
            />
          </Link>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/about"
              className={fontBarClass}
            >
              <FormattedMessage {...messages.about} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/features"
              className={fontBarClass}
            >
              <FormattedMessage {...messages.features} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/pricing"
              className={fontBarClass}
            >
              <FormattedMessage {...messages.pricing} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/resources"
              className={fontBarClass}
            >
              <FormattedMessage {...messages.resources} />
            </Link>
          </nav>
          <DarkToggle />
          {loggedIn ? (
            <React.Fragment>
              <Button
                component={RouterLink}
                to="/dashboard"
                color="primary"
                variant="contained"
                className={fontBarClass}
              >
                Dashboard
              </Button>
              <IconButton
                className={classes.iconbutton}
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <Avatar
                  src={userAvatar}
                  alt={userName}
                  className={avatarClass}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  component={RouterLink}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/account"
                  onClick={handleClose}
                >
                  My account
                </MenuItem>
                <MenuItem onClick={logoutUser}>Log out</MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                variant="contained"
                className={fontBarClass}
              >
                Sign in
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                color="primary"
                variant="contained"
                className={fontBarClass}
              >
                Register an account
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  userData: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  logoutUser: PropTypes.func,
  background: PropTypes.bool,
};

export default Header;
