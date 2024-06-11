// import * as React from   'react';
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { ThemeProvider } from "@mui/material/styles"
import { MainTheme } from "../../../assets/Theme"
import { useAuth } from "../../../hooks"
const defaultTheme = MainTheme
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
export default function LogIn() {
  const { logIn } = useAuth()
  const navigate = useNavigate()
  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const data = new FormData(event.currentTarget)
  //   console.log("USERNAME", data)
  //   console.log("password", data.password)
  //   try {
  //     let res = await logIn({
  //       username: data.username,
  //       password: data.password,
  //     })
  //     if (res.EC != 1) {
  //       toast.success("Đăng nhập thành công")
  //     }
  //     navigate("/")
  //   } catch (error) {
  //     toast.error("Đăng nhập không thành công, vui lòng thử lại")
  //   }
  // }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async function (values) {
      try {
        console.log("USERNAME", values.username)
        await logIn({
          username: values.username,
          password: values.password,
        })
        const role = localStorage.getItem("role")
        console.log("ROLELOGIN", role)
        toast.success("Đăng nhập thành công")
        if (role == 1) {
          navigate("/")
        } else if (role == 4) {
          navigate("/studentDashboard")
        } else if (role == 3) {
          navigate("/officerTuition")
        } 
      } catch (error) {
        toast.error("Đăng nhập không thành công, vui lòng thử lại")
      }
    },
  })
  const divStyle = {
    backgroundImage: `url(public/Login.png)`,
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
    padding: "5%",
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="bg-cover" style={divStyle}>
        <Container
          className="blurred-container box-sizing: content-box;"
          component="main"
          maxWidth="xs"
          style={{
            padding: "20px",
            backdropFilter: "blur(20px)",
            borderRadius: "10px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ color: "gray" }}>
              Đăng Nhập
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
                autoFocus
                {...formik.getFieldProps("username")}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                {...formik.getFieldProps("password")}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ tôi"
                style={{ color: "gray" }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{
                  color: "white",
                }}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  )
}
