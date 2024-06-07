import SideBar from "../../share/SideBar"
import PropTypes from "prop-types"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import PreLoader from "../PreLoading"
import StudentSidebar from "../../share/StudentSidebar"
import OfficerSidebar from "../../share/OfficerSidebar"
export default function DefaultLayout({ children }) {
  const role = localStorage.getItem("role")
  console.log("ROLE", role)
  return (
    <div className="relative m-0 overflow-auto p-0">
      <PreLoader></PreLoader>
      <Grid container component="main" sx={{ height: "100vh", transitionDelay: "10s", overflow: "auto" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} lg={2} sx={{ display: { xs: "none", sm: "block" } }}>
          {role == 1 ? <SideBar /> : role == 4 ? <StudentSidebar /> : role == 3 ? <OfficerSidebar /> : <div></div>}
        </Grid>
        <Grid sx={{ overflow: "auto", background: "#fafafa" }} item xs={12} sm={8} lg={10} elevation={6}>
          {children}
        </Grid>
      </Grid>
    </div>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
