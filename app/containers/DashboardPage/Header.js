/**
 *
 * Header
 *
 */

import React from 'react';
import clsx from 'clsx';
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

import { makeStyles } from '@material-ui/core/styles';

import Logo from 'images/logo-withouttext.png';
import DarkmodeLogo from 'images/logo-darkmode.png';

import PropTypes from 'prop-types';
import messages from './messages';

const drawerWidth = 240;

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
  root: {
    display: 'flex',
  },
  appBarShift: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flex: '0 1 auto',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
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
  menuIconR: {
    marginRight: theme.spacing(5),
    flex: '0 1 auto',
    margin: 15,
    marginLeft: 'auto',
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

function Header({
  loggedIn,
  userData,
  logoutUser,
  handleDrawerOpen,
  open,
  background,
}) {
  const classes = useStyles();

  const userAvatar = userData.picture || 'https://i.pravatar.cc/300';
  const userName = userData.name || userData.email || 'Placeholder';

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
              to="/profile"
            >
              <Avatar src={userAvatar} alt={userName} className={avatarClass} />
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
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
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
  handleDrawerOpen: PropTypes.func,
  open: PropTypes.bool,
  background: PropTypes.bool,
};

export default Header;
