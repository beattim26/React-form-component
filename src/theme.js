// @flow

import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1E88E5',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#455A64',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'sans-serif',
    ],
  },
});

export default theme;
