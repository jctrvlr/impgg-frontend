import { createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const themeDark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: red,
    secondary: grey,
    backgroundColor: '#000',
  },
  status: {
    danger: 'orange',
  },
});

const themeLight = createMuiTheme({
  palette: {
    type: 'light',
    primary: red,
    secondary: grey,
    backgroundColor: grey[200],
  },
  status: {
    danger: 'orange',
  },
});

const theme = mode => (mode === 'dark' ? themeDark : themeLight);

export default theme;
