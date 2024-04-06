import SideBar from "../../share/SideBar"
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

export default function DefaultLayout({children}) {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        lg={2}
        sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SideBar />
      </Grid>
      <Grid item xs={12} sm={8} lg={10} elevation={6} >
        {children}
      </Grid>
    </Grid>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
