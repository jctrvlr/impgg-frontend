/**
 *
 * Header
 * TODO: Update menu icon margins at top as well as popdown menu that extends from avatar in drawer
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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

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
    marginTop: 'auto',
  },
  menuIconButton: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
  },
  menuIconButtonNoBackground: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(2),
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

function Header({ loggedIn, userData, logoutUser, background }) {
  const classes = useStyles();

  const userAvatar = userData.picture || 'https://i.pravatar.cc/300';
  const userName = userData.name || userData.email || 'Placeholder';
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (side, sideOpen) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [side]: sideOpen });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button component={RouterLink} to="/about">
          <ListItemText primary={<FormattedMessage {...messages.about} />} />
        </ListItem>
        <ListItem button component={RouterLink} to="/features">
          <ListItemText primary={<FormattedMessage {...messages.features} />} />
        </ListItem>
        <ListItem button component={RouterLink} to="/pricing">
          <ListItemText primary={<FormattedMessage {...messages.pricing} />} />
        </ListItem>
        <ListItem button component={RouterLink} to="/resources">
          <ListItemText
            primary={<FormattedMessage {...messages.resources} />}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DarkToggle />
          </ListItemIcon>
        </ListItem>
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
              <Avatar src={userAvatar} alt={userName} className={avatarClass} />
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
      </List>
    </div>
  );

  function handleMenu(event) {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const appBarClass = background ? classes.appBar : classes.transparentAppbar;
  const fontBarClass = background ? classes.link : classes.linkNoBackground;
  const avatarClass = background ? classes.avatar : classes.avatarNoBackground;
  const logoB = background ? Logo : DarkmodeLogo;

  const menuButtonColor = background
    ? classes.menuIconButton
    : classes.menuIconButtonNoBackground;

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
        <Toolbar className={classes.toolbarMobile}>
          <Link component={RouterLink} to="/" className={classes.toolbarTitle}>
            <img
              alt="ImpGG logo. Your friendly neighborhood link shortener"
              src={logoB}
              className={classes.logo}
            />
          </Link>
          <IconButton
            edge="end"
            className={classes.menuIconR}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('right', true)}
          >
            <MenuIcon className={menuButtonColor} />
          </IconButton>
          <Drawer open={state.right} onClose={toggleDrawer('right', false)}>
            {sideList('right')}
          </Drawer>
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
