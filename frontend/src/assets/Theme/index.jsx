import { createTheme } from '@mui/material/styles';
import { lightBlue } from '@mui/material/colors';

const MainTheme = createTheme({
  palette: {
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: lightBlue[200],
    },
  },
});

export {MainTheme};

