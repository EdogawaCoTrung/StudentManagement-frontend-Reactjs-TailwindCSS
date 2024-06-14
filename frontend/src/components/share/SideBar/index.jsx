import { useEffect, useState } from "react" // For managing drawer state
import { MainTheme } from "../../../assets/Theme"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import LOGO from "../../../assets/Logo/Black and White Collection 15.svg"
import { Link, NavLink } from "react-router-dom"
import { MdOutlineDashboard } from "react-icons/md"
import { MdOutlineClass } from "react-icons/md"
import { PiStudent } from "react-icons/pi"
import { LiaChalkboardTeacherSolid } from "react-icons/lia"
import { CiMoneyCheck1 } from "react-icons/ci"
import { MdOutlineRuleFolder } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import { routes } from "../../../config"
import { jwtDecode } from "jwt-decode"
import { RiProfileLine } from "react-icons/ri"
import { Button } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../../hooks"
import { IoBookOutline } from "react-icons/io5"
import { MdOutlineAssignmentInd } from "react-icons/md"
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
        <div className=" flex h-screen w-[220] flex-col content-center border-r-2 bg-sidebar p-2 align-middle shadow">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
            <img src={LOGO} alt="Logo" style={{ width: "50px", height: "50px", padding: "3px" }} />
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                marginLeft: "10px",
                fontWeight: "bold",
                color: "white",
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
          <NavLink
            key={0}
            onClick={() => handleListItemClick(0)}
            className={
              selectedIndex == 0
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Dashboard}
          >
            <div className="flex items-center">
              <MdOutlineDashboard />
              <span className="ml-3">Dashboard</span>
            </div>
          </NavLink>
          <NavLink
            key={1}
            onClick={() => handleListItemClick(1)}
            className={
              selectedIndex == 1
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Class}
          >
            <div className="flex items-center">
              <MdOutlineClass />
              <span className="ml-3">Class</span>
            </div>
          </NavLink>
          <NavLink
            key={2}
            onClick={() => handleListItemClick(2)}
            className={
              selectedIndex == 2
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Student}
          >
            <div className="flex items-center">
              <PiStudent />
              <span className="ml-3">Student</span>
            </div>
          </NavLink>
          <NavLink
            key={3}
            onClick={() => handleListItemClick(3)}
            className={
              selectedIndex == 3
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Teacher}
          >
            <div className="flex items-center">
              <LiaChalkboardTeacherSolid />
              <span className="ml-3">Teacher</span>
            </div>
          </NavLink>
          <NavLink
            key={4}
            onClick={() => handleListItemClick(4)}
            className={
              selectedIndex == 4
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Assignment}
          >
            <div className="flex items-center">
              <MdOutlineAssignmentInd />
              <span className="ml-3">Assignment</span>
            </div>
          </NavLink>
          <NavLink
            key={5}
            onClick={() => handleListItemClick(5)}
            className={
              selectedIndex == 5
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Tuition}
          >
            <div className="flex items-center">
              <CiMoneyCheck1 />
              <span className="ml-3">Tuition</span>
            </div>
          </NavLink>
          <NavLink
            key={6}
            onClick={() => handleListItemClick(6)}
            className={
              selectedIndex == 6
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Subject}
          >
            <div className="flex items-center">
              <IoBookOutline />
              <span className="ml-3">Subject</span>
            </div>
          </NavLink>
          <NavLink
            key={7}
            onClick={() => handleListItemClick(7)}
            className={
              selectedIndex == 7
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.Regulations}
          >
            <div className="flex items-center">
              <MdOutlineRuleFolder />
              <span className="ml-3">Regulations</span>
            </div>
          </NavLink>
          <NavLink
            key={8}
            onClick={() => handleListItemClick(8)}
            className={
              selectedIndex == 8
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-2 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-2 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.AdministratorProfile}
          >
            <div className="flex items-center">
              <RiProfileLine />
              <span className="ml-3">Profile</span>
            </div>
          </NavLink>
          <div className=" mx-auto my-2 h-2 w-11/12 border-t-2 border-gray-400 "></div>
          <div className="flex flex-col">
            <p className="mb-2 font-Manrope  text-base font-semibold text-white">Profile</p>
            <div className="mb-2 flex items-center">
              <FaCircleUser className="mr-2 text-3xl" />
              <div className="flex flex-col font-Manrope">
                <p className=" text-base font-semibold text-white">{decode.payload.username}</p>
                <p className="overflow-ellipsis  text-xs text-neutral-300">{decode.payload.email}</p>
              </div>
            </div>
            <Link to={routes.Login} className="w-full mt-2 flex justify-center">
              <Button
                onClick={() => logOut()}
                fontFamily="Manrope"
                variant="contained"
                color="secondary"
                startIcon={<LogoutIcon />}
              >
                <Typography
                  component="div"
                  sx={{
                    flexGrow: 1,
                    fontWeight: "bold",
                  }}
                >
                  Log Out
                </Typography>
              </Button>
            </Link>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
