import { createTheme, alpha } from '@mui/material/styles';

export default createTheme({
  palette: {
    primary: {
      main: '#2F62AC',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fafafa',
      contrastText: alpha('#000', 0.6),
    },
    background: {
      main: '#274E87',
      contrastText: '#ffffff',
    },
    brightBackground: {
      main: '#ffffff',
      contrastText: '#274E87',
    },
  },
});
