// import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

const themeLight = createMuiTheme({
  palette: {
    type: 'light',
    primary: red,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

// eslint-disable-next-line no-unused-vars
const theme = mode => (mode === 'dark' ? themeDark : themeLight);

export default themeDark;
