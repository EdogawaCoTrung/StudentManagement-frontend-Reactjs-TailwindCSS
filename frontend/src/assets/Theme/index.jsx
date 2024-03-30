import { createTheme } from '@mui/material/styles';
import { blue, lightBlue } from '@mui/material/colors';

const MainTheme = createTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: lightBlue[500],
    },
  },
});

export {MainTheme};

