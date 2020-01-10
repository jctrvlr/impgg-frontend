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
import IconButton from '@material-ui/core/IconButton';
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
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

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
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    background: '#E31837',
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbarTitle: {
    [theme.breakpoints.down(768)]: {
      marginLeft: '0%',
    },
    marginLeft: '50%',
    flexGrow: '1',
  },
  logo: {
    height: 65,
    margin: 10,
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
  alertsIcon: {
    color: '#fff',
    margin: 15,
  },
  menuIconR: {
    margin: 15,
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
  darkToggleButton: {
    margin: 'auto',
  },
}));

function Header({ loggedIn, userData, logoutUser, alerts }) {
  const classes = useStyles();

  const userAvatar = userData.user.profile.picture
    ? userData.user.profile.picture
    : false;

  const [state, setState] = React.useState({
    right: false,
    left: true,
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
        <ListItem>
          <ListItemIcon>
            <DarkToggle className={classes.darkToggleButton} />
          </ListItemIcon>
        </ListItem>
        {loggedIn ? (
          <React.Fragment>
            <Button
              component={RouterLink}
              to="/"
              color="primary"
              variant="contained"
              className={fontBarClass}
            >
              Back to home
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
                  className={avatarClass}
                />
              ) : (
                <Avatar alt="Profile Picture" className={avatarClass}>
                  {userData.user.profile.firstName.charAt(0).toUpperCase()}
                </Avatar>
              )}
            </IconButton>
            <Divider />
            <List>
              <ListItem button component={RouterLink} to="/profile">
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<FormattedMessage {...messages.profile} />}
                />
              </ListItem>
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

  const fontBarClass = classes.linkNoBackground;
  const avatarClass = classes.avatarNoBackground;
  const logoB = DarkmodeLogo;

  const menuButtonColor = classes.menuIconButtonNoBackground;

  const alertsCount = alerts ? alerts.length() : 0;

  return (
    <React.Fragment>
      <div id="nav-top" />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <Link
            component={RouterLink}
            to="/dashboard"
            className={classes.toolbarTitle}
          >
            <img
              alt="ImpGG logo. Your friendly neighborhood link shortener"
              src={logoB}
              className={classes.logo}
            />
          </Link>
          <IconButton
            edge="end"
            className={classes.alertsIcon}
            color="inherit"
            aria-label="alerts"
          >
            <Badge badgeContent={alertsCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
  alerts: PropTypes.array,
};

export default Header;
