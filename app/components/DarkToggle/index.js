/**
 *
 * DarkToggle
 *
 */

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import BrightnessMedium from '@material-ui/icons/BrightnessMedium';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from 'themeProvider';

const useStyles = makeStyles(theme => ({
  iconbutton: {
    padding: 0,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.text.primary,
  },
}));

function DarkToggle() {
  const classes = useStyles();
  const themeState = useTheme();

  return (
    <IconButton
      className={classes.iconbutton}
      onClick={() => themeState.toggle()}
    >
      <Avatar className={classes.avatar}>
        <BrightnessMedium />
      </Avatar>
    </IconButton>
  );
}

export default DarkToggle;
