import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#477dac',
      contrastText: grey[50],
    },
    background: {
      main: '#274E87',
      contrastText: grey[50],
    },
  },
});
