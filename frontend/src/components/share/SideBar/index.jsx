import { useEffect, useState } from "react" // For managing drawer state
import { MainTheme } from "../../../assets/Theme"
import { ThemeProvider } from "@mui/material/styles"
import Tabs from "@mui/material/Tabs"
import LinkTab from "@mui/material/Tab"
import { pagesName } from "../../../assets/PagesName/index"
import { publicRoutes } from "../../../routes"
import Typography from "@mui/material/Typography"
import LOGO from "../../../assets/Logo/Black and White Collection 15.svg"
import { NavLink } from "react-router-dom"
import { MdOutlineDashboard } from "react-icons/md"
import { MdOutlineClass } from "react-icons/md"
import { PiStudent } from "react-icons/pi"
import { LiaChalkboardTeacherSolid } from "react-icons/lia"
import { MdOutlineSummarize } from "react-icons/md"
import { CiMoneyCheck1 } from "react-icons/ci"
import { MdOutlineRuleFolder } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"

const defaultTheme = MainTheme

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(() => parseInt(localStorage.getItem("selectedIndex")) || 0)
  const [currentTab, setCurrentTab] = useState(selectedIndex)
  useEffect(() => {
    localStorage.setItem("selectedIndex", selectedIndex)
  }, [selectedIndex])

  const handleListItemClick = (index) => {
    setSelectedIndex(index)
  }

  const handleTabSelection = () => {
    setCurrentTab(selectedIndex)
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
            }}
          >
            Student<br></br>Management
          </Typography>
        </div>
        <div className="flex h-screen w-[220] flex-col content-center border-r-2 bg-white p-3 align-middle shadow">
          {pagesName.map((text, index) => (
            <NavLink
              key={index}
              onClick={() => handleListItemClick(index)}
              className={
                selectedIndex == index
                  ? "bg-PrimaryColor content-center space-x-3 rounded-md border-l-[6px] border-solid border-blue-500 p-3 font-sans text-xl font-bold text-white transition-all"
                  : "content-center space-x-3 rounded-md p-3 font-sans text-xl font-bold text-gray-500 transition-all hover:ml-4"
              }
              // sx={{
              //   width: 220,
              //   alignContent: "center",
              //   color: selectedIndex === index ? "white" : "gray",
              //   fontWeight: "bold",
              //   backgroundColor: selectedIndex === index ? "primary.main" : undefined,
              //   "&:hover": {
              //     backgroundColor: "secondary.main",
              //   },
              // }}
              to={publicRoutes[index + 2].path}
            >
              <div className="flex items-center">
                {text == "Thống kê" ? (
                  <MdOutlineDashboard />
                ) : text == "Lớp" ? (
                  <MdOutlineClass />
                ) : text == "Học Sinh" ? (
                  <PiStudent />
                ) : text == "Giáo Viên" ? (
                  <LiaChalkboardTeacherSolid />
                ) : text == "Học bạ" ? (
                  <MdOutlineSummarize />
                ) : text == "Học phí" ? (
                  <CiMoneyCheck1 />
                ) : (
                  <MdOutlineRuleFolder />
                )}
                <span className="ml-3">{text}</span>
              </div>
            </NavLink>
          ))}
          <div className=" mx-auto my-2 h-2 w-11/12 border-t-2 border-gray-400 "></div>
          <div className="flex flex-col">
            <p className="mb-2 font-sans text-base font-semibold text-gray-500">Profile</p>
            <div className="flex items-center">
              <FaCircleUser className="mr-2 text-3xl" />
              <div className="flex flex-col">
                <p className="font-sans text-base font-semibold text-black">Helloword1</p>
                <p className="overflow-ellipsis font-sans text-xs text-neutral-400">Helloword1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  )
}
