import { useEffect, useState } from "react" // For managing drawer state
import { MainTheme } from "../../../assets/Theme"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import LOGO from "../../../assets/Logo/Black and White Collection 15.svg"
import { Link, NavLink } from "react-router-dom"
import { MdOutlineDashboard } from "react-icons/md"
import { MdOutlineClass } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import { routes } from "../../../config"
import { jwtDecode } from "jwt-decode"
import { Button } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../../hooks"
const defaultTheme = MainTheme

export default function Sidebar() {
  const { logOut } = useAuth()
  const [selectedIndex, setSelectedIndex] = useState(() => parseInt(localStorage.getItem("selectedIndex")) || 0)
  useEffect(() => {
    console.log("selectedIndex", selectedIndex)
    localStorage.setItem("selectedIndex", selectedIndex)
  }, [selectedIndex])
  const token = localStorage.getItem("accessToken")
  const decode = jwtDecode(token)
  console.log("DECODE", token)
  const handleListItemClick = (index) => {
    setSelectedIndex(index)
  }

  return (
    <div style={{ position: "fixed" }}>
      <ThemeProvider theme={defaultTheme}>
        <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
          <img src={LOGO} alt="Logo" style={{ width: "50px", height: "50px", padding: "3px" }} />
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              marginLeft: "10px",
              fontWeight: "bold",
              color: "gray",
              background: "linear-gradient(272deg, #059669 22.06%, #00D995 116.84%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "Manrope",
            }}
          >
            Student<br></br>Management
          </Typography>
        </div>
        <div className=" flex h-screen w-[220] flex-col content-center border-r-2 bg-white p-3 align-middle shadow">
          <NavLink
            key={0}
            onClick={() => handleListItemClick(0)}
            className={
              selectedIndex == 0
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-white transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-gray-500 transition-all hover:ml-4"
            }
            to={routes.OfficerTuition}
          >
            <div className="flex items-center">
              <MdOutlineDashboard />
              <span className="ml-3">Tuition</span>
            </div>
          </NavLink>
          <NavLink
            key={1}
            onClick={() => handleListItemClick(1)}
            className={
              selectedIndex == 1
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-white transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-gray-500 transition-all hover:ml-4"
            }
            to={routes.OfficerProfile}
          >
            <div className="flex items-center">
              <MdOutlineClass />
              <span className="ml-3">Profile</span>
            </div>
          </NavLink>
          <div className=" mx-auto my-2 h-2 w-11/12 border-t-2 border-gray-400 "></div>
          <div className="flex flex-col">
            <p className="mb-2 font-Manrope  text-base font-semibold text-gray-500">Profile</p>
            <div className="mb-2 flex items-center">
              <FaCircleUser className="mr-2 text-3xl" />
              <div className="flex flex-col font-Manrope">
                <p className=" text-base font-semibold text-black">{decode.payload.username}</p>
                <p className="overflow-ellipsis  text-xs text-neutral-400">{decode.payload.email}</p>
              </div>
            </div>
            <Link to={routes.Login} className="w-full">
              <Button
                onClick={() => logOut()}
                fontFamily="Manrope"
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
