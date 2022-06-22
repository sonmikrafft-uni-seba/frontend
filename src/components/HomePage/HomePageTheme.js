import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

export const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#fafafa',
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
  spacing: 6,
});
