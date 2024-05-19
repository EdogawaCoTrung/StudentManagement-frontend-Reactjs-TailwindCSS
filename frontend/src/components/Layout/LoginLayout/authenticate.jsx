import { Navigate } from "react-router-dom"

export const AuthorizedAdministrator = function ({ children }) {
  const token = localStorage.getItem("accessToken")
  const role = localStorage.getItem("role")
  console.log("CHECKAUTH", role == 1)
  if (role != 1) {
    console.log("VAOIF")
    return <Navigate to={"/login"} replace={true}></Navigate>
  } else if (token && role == 1) return children
}

export const AuthorizedStudent = function ({ children }) {
  const token = localStorage.getItem("accessToken")
  const role = localStorage.getItem("role")
  console.log("CHECKAUTHAuthorizedStudent", role == 4)
  if (role != 4) {
    return <Navigate to={"/login"} replace={true}></Navigate>
  } else if (token && role == 4) return children
}

export const AuthorizedTeacher = function ({ children }) {
  const token = localStorage.getItem("accessToken")
  const role = localStorage.getItem("role")
  if (role != 2) {
    return <Navigate to={"/login"} replace={true}></Navigate>
  } else if (token && role == 2) return children
}

export const AuthorizedOfficer = function ({ children }) {
  const token = localStorage.getItem("accessToken")
  const role = localStorage.getItem("role")
  if (role != 3) {
    return <Navigate to={"/login"} replace={true}></Navigate>
  } else if (token && role == 3) return children
}

// export const LoggedAdmin = function ({ children }) {
//   const token = localStorage.getItem("accessToken")
//   const role = localStorage.getItem("role")
//   if (token && role === "ADMIN") {
//     return <Navigate to={"/"} replace={true}></Navigate>
//   } else if (token && role === "Administrator") {
//     return <Navigate to={"/Administrator-notification"} replace={true}></Navigate>
//   }
//   return children
// }
