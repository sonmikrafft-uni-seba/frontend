import { createTheme } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';

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
  },
});
