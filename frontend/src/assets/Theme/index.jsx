import { createTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';
import { colors } from '@mui/material';

const MainTheme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: lightBlue[200],
    },
    button: {
      main: colors.lightGreen[500],
    }
  },
});

export {MainTheme};

