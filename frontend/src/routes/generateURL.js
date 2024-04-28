// eslint-disable-next-line
import Student from "../pages/Student"
import Class from "../pages/Class"
import Activity from "../pages/Activity"
import Teacher from "../pages/Teacher"
import Statistics from "../pages/Statistics"
import Logout from "../pages/Logout"
import Plan from "../pages/Plan"
import Revenue from "../pages/Revenue"
import StudentTable from "../components/share/StudentTable"
import { pages } from "../assets/PagesName"
function generateURL(Routes) {
  for (const page of pages) {
    let encodedPage = "/" + page
    let componentName = page.charAt(0).toUpperCase() + page.slice(1)
    let component
    switch (componentName) {
      case "Student":
        component = StudentTable
        break
      case "Class":
        component = Class
        break
      case "Activity":
        component = Activity
        break
      case "Teacher":
        component = Teacher
        break
      case "Statistics":
        component = Statistics
        break
      case "Logout":
        component = Logout
        break
      case "Plan":
        component = Plan
        break
      case "Revenue":
        component = Revenue
        break
      default:
        component = null
    }
    if (component) {
      Routes.push({ path: encodedPage, component: component })
    }
  }
}

export { generateURL }
