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
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
});

export {MainTheme};

