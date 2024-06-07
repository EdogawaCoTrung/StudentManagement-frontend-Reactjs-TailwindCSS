import { routes } from "../config"
import Dashboard from "../pages/Administrator/Dashboard"
import Class from "../pages/Administrator/Class"
import Student from "../pages/Administrator/Student"
import Summaries from "../pages/Administrator/Class/summaries"
import Teacher from "../pages/Administrator/Teacher"
import Tuition from "../pages/Administrator/Plan"
import Regulations from "../pages/Administrator/Regulations"
import LogIn from "../components/Layout/LoginLayout"
import {
  AuthorizedAdministrator,
  AuthorizedStudent,
  AuthorizedOfficer,
} from "../components/Layout/LoginLayout/authenticate"
import AdministratorProfile from "../pages/Administrator/Profile"
import StudentDashboard from "../pages/Student/Dashboard"
import StudentClass from "../pages/Student/Class"
import StudentProfile from "../pages/Student/Profile"
import StudentSummaries from "../pages/Student/Summaries"
import StudentTuition from "../pages/Student/Plan"
import OfficerTuition from "../pages/Officer/Plan"
import OfficerProfile from "../pages/Officer/Profile"
import Subject from "../pages/Administrator/Subject"
import StudentSummariesTable from "../pages/Administrator/Student/SummariesById"
import Assignment from "../pages/Administrator/Assignment"
const publicRoutes = [
  {
    path: routes.Dashboard,
    component: (
      <AuthorizedAdministrator>
        <Dashboard></Dashboard>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Class,
    component: (
      <AuthorizedAdministrator>
        <Class></Class>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Student,
    component: (
      <AuthorizedAdministrator>
        <Student></Student>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Teacher,
    component: (
      <AuthorizedAdministrator>
        <Teacher></Teacher>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Tuition,
    component: (
      <AuthorizedAdministrator>
        <Tuition></Tuition>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.SummariesById,
    component: (
      <AuthorizedAdministrator>
        <Summaries></Summaries>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Regulations,
    component: (
      <AuthorizedAdministrator>
        <Regulations></Regulations>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.AdministratorProfile,
    component: (
      <AuthorizedAdministrator>
        <AdministratorProfile></AdministratorProfile>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Subject,
    component: (
      <AuthorizedAdministrator>
        <Subject></Subject>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.StudentSummariesById,
    component: (
      <AuthorizedAdministrator>
        <StudentSummariesTable></StudentSummariesTable>
      </AuthorizedAdministrator>
    ),
  },
  {
    path: routes.Assignment,
    component: (
      <AuthorizedAdministrator>
        <Assignment></Assignment>
      </AuthorizedAdministrator>
    ),
  },
]
const StudentRoutes = [
  {
    path: routes.StudentDashboard,
    component: (
      <AuthorizedStudent>
        <StudentDashboard></StudentDashboard>
      </AuthorizedStudent>
    ),
  },
  {
    path: routes.StudentClass,
    component: (
      <AuthorizedStudent>
        <StudentClass></StudentClass>
      </AuthorizedStudent>
    ),
  },
  {
    path: routes.StudentProfile,
    component: (
      <AuthorizedStudent>
        <StudentProfile></StudentProfile>
      </AuthorizedStudent>
    ),
  },
  {
    path: routes.StudentSummaries,
    component: (
      <AuthorizedStudent>
        <StudentSummaries></StudentSummaries>
      </AuthorizedStudent>
    ),
  },
  {
    path: routes.StudentTuition,
    component: (
      <AuthorizedStudent>
        <StudentTuition></StudentTuition>
      </AuthorizedStudent>
    ),
  },
]
const OfficerRoutes = [
  {
    path: routes.OfficerTuition,
    component: (
      <AuthorizedOfficer>
        <OfficerTuition></OfficerTuition>
      </AuthorizedOfficer>
    ),
  },
  {
    path: routes.OfficerProfile,
    component: (
      <AuthorizedOfficer>
        <OfficerProfile></OfficerProfile>
      </AuthorizedOfficer>
    ),
  },
]
const LoginRoute = [{ path: routes.Login, component: LogIn }]
console.log("LINK", publicRoutes[1].path)
export { publicRoutes, StudentRoutes, LoginRoute, OfficerRoutes }
