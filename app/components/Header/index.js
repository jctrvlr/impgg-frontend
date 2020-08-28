/**
 *
 * Header
 * TODO: Update menu icon margins at top as well as popdown menu that extends from avatar in drawer
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import ReactGA from 'react-ga';

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
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { makeStyles } from '@material-ui/core/styles';

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
    color: '#fff',
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

function Header({ loggedIn, userData, logoutUser, background }) {
  const classes = useStyles();

  const userAvatar =
    userData && userData.user && userData.user.profile.picture
      ? userData.user.profile.picture
      : false;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [state, setState] = React.useState({
    right: false,
  });

  const today = new Date();

  const subscriptionActive =
    userData &&
    userData.user &&
    userData.user.subscription &&
    userData.user.subscription.active &&
    new Date(userData.user.subscription.currentPeriodEnd) > today;

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
        <ListItem button component={RouterLink} to="/pricing">
          <ListItemText primary={<FormattedMessage {...messages.pricing} />} />
        </ListItem>
        {/*
        <ListItem button component={RouterLink} to="/resources">
          <ListItemText
            primary={<FormattedMessage {...messages.resources} />}
          />
        </ListItem>
        */}
      </List>
      <Divider />
      <List>
        <ListItem>
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
              className={classes.linkNoBackground}
            >
              <FormattedMessage {...messages.dashboard} />
            </Button>
            <IconButton
              className={classes.iconbutton}
              aria-label="Profile of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              component={RouterLink}
              to="/settings/profile"
            >
              {userAvatar ? (
                <Avatar
                  src={userData.user.profile.picture}
                  alt="Profile Picture"
                  className={classes.avatarNoBackground}
                />
              ) : (
                <Avatar
                  alt="Profile Picture"
                  className={classes.avatarNoBackground}
                >
                  {userData.user.profile.firstName.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </IconButton>
            <List>
              <ListItem button component={RouterLink} to="/domains">
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<FormattedMessage {...messages.domains} />}
                />
              </ListItem>
              {subscriptionActive ? (
                <ListItem button component={RouterLink} to="/reports">
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={<FormattedMessage {...messages.reports} />}
                  />
                </ListItem>
              ) : null}
              <ListItem button component={RouterLink} to="/settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<FormattedMessage {...messages.settings} />}
                />
              </ListItem>
              <ListItem button onClick={logoutUser}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<FormattedMessage {...messages.logOut} />}
                />
              </ListItem>
            </List>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              component={RouterLink}
              to="/login"
              color="primary"
              variant="contained"
              className={classes.linkNoBackground}
            >
              <FormattedMessage {...messages.signIn} />
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              color="primary"
              variant="contained"
              onClick={() =>
                ReactGA.event({
                  category: 'Sign Up',
                  action: 'User pressed header register button',
                })
              }
              className={classes.linkNoBackground}
            >
              <FormattedMessage {...messages.register} />
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

  const menuButtonColor = background
    ? classes.menuIconButton
    : classes.menuIconButtonNoBackground;

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
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/about"
              className={classes.linkNoBackground}
            >
              <FormattedMessage {...messages.about} />
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/pricing"
              className={classes.linkNoBackground}
            >
              <FormattedMessage {...messages.pricing} />
            </Link>
            {/*
            <Link
              variant="button"
              color="textPrimary"
              component={RouterLink}
              to="/resources"
              className={classes.linkNoBackground}
            >
              <FormattedMessage {...messages.resources} />
            </Link>
            */}
          </nav>
          <DarkToggle />
          {loggedIn ? (
            <React.Fragment>
              <Button
                component={RouterLink}
                to="/dashboard"
                color="primary"
                variant="contained"
                className={classes.linkNoBackground}
              >
                <FormattedMessage {...messages.dashboard} />
              </Button>
              <IconButton
                className={classes.iconbutton}
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                {userAvatar ? (
                  <Avatar
                    src={userData.user.profile.picture}
                    alt="Profile Picture"
                    className={classes.avatarNoBackground}
                  />
                ) : (
                  <Avatar
                    alt="Profile Picture"
                    className={classes.avatarNoBackground}
                  >
                    {userData.user.profile.firstName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
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
                  to="/domains"
                  onClick={handleClose}
                >
                  <FormattedMessage {...messages.domains} />
                </MenuItem>
                {subscriptionActive ? (
                  <MenuItem
                    component={RouterLink}
                    to="/reports"
                    onClick={handleClose}
                  >
                    <FormattedMessage {...messages.reports} />
                  </MenuItem>
                ) : null}
                <MenuItem
                  component={RouterLink}
                  to="/settings"
                  onClick={handleClose}
                >
                  <FormattedMessage {...messages.settings} />
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                  <FormattedMessage {...messages.logOut} />
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                variant="contained"
                className={classes.linkNoBackground}
              >
                <FormattedMessage {...messages.signIn} />
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                color="primary"
                variant="contained"
                onClick={() =>
                  ReactGA.event({
                    category: 'Sign Up',
                    action: 'User pressed header register button',
                  })
                }
                className={classes.linkNoBackground}
              >
                <FormattedMessage {...messages.register} />
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
        <Toolbar className={classes.toolbarMobile}>
          <Link component={RouterLink} to="/" className={classes.toolbarTitle}>
            <img
              alt="ImpGG logo. Your friendly neighborhood link shortener"
              src={DarkmodeLogo}
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
          <Drawer
            anchor="right"
            open={state.right}
            onClose={toggleDrawer('right', false)}
          >
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
