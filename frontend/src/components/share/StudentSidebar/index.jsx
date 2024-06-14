import { useEffect, useState } from "react" // For managing drawer state
import { MainTheme } from "../../../assets/Theme"
import { ThemeProvider } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import LOGO from "../../../assets/Logo/Black and White Collection 15.svg"
import { Link, NavLink } from "react-router-dom"
import { MdOutlineDashboard } from "react-icons/md"
import { MdOutlineClass } from "react-icons/md"
import { CiMoneyCheck1 } from "react-icons/ci"
import { MdOutlineRuleFolder } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"
import { routes } from "../../../config"
import { jwtDecode } from "jwt-decode"
import { RiProfileLine } from "react-icons/ri"
import { Avatar, Button } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import { useAuth } from "../../../hooks"
import { accountApi } from "../../../apis"
const defaultTheme = MainTheme

export default function StudentSidebar() {
  const { logOut } = useAuth()
  const [selectedIndex, setSelectedIndex] = useState(() => parseInt(localStorage.getItem("selectedIndex")) || 0)
  const userId = localStorage.getItem("userId")
  const [student, setStudent] = useState("")
  useEffect(() => {
    console.log("selectedIndex", selectedIndex)
    localStorage.setItem("selectedIndex", selectedIndex)
  }, [selectedIndex])
  const token = localStorage.getItem("accessToken")
  let decode = token
  if (decode != null) {
    decode = jwtDecode(token)
  }
  console.log("DECODE", token)
  const handleListItemClick = (index) => {
    setSelectedIndex(index)
  }
  const fetchAccountById = async () => {
    let res = await accountApi.getAccountById(userId)
    console.log("RESDT", res)
    setStudent(res)
  }
  useEffect(() => {
    fetchAccountById()
  }, [])
  console.log("student", student)
  return (
    <div style={{ position: "fixed" }}>
      <ThemeProvider theme={defaultTheme}>
        <div className=" flex h-screen w-[220] flex-col content-center border-r-2 bg-sidebar p-3 align-middle shadow">
          <div style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
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
          <NavLink
            key={0}
            onClick={() => handleListItemClick(0)}
            className={
              selectedIndex == 0
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.StudentDashboard}
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
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.StudentClass}
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
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.StudentTuition}
          >
            <div className="flex items-center">
              <CiMoneyCheck1 />
              <span className="ml-3">Tuition</span>
            </div>
          </NavLink>
          <NavLink
            key={3}
            onClick={() => handleListItemClick(3)}
            className={
              selectedIndex == 3
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.StudentSummaries}
          >
            <div className="flex items-center">
              <MdOutlineRuleFolder />
              <span className="ml-3">Summaries</span>
            </div>
          </NavLink>
          <NavLink
            key={4}
            onClick={() => handleListItemClick(4)}
            className={
              selectedIndex == 4
                ? "f content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 bg-PrimaryColor p-3 font-Manrope text-xl font-semibold text-black transition-all"
                : "content-center space-x-3 rounded-md p-3 font-Manrope text-xl font-semibold text-white transition-all hover:ml-4"
            }
            to={routes.StudentProfile}
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
              {student?.image != null ? (
                <img className="mr-3 h-10 w-10 rounded-full object-cover" src={student.image}></img>
              ) : (
                <Avatar src="/teacher.png" alt="Student" sx={{ height: 40, width: 40, marginRight: "12px" }} />
              )}
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
