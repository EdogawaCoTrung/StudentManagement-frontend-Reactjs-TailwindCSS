import Home from "../pages/Home"
import LogInPage from "../pages/Login/index.jsx"
import LogIn from "../components/Layout/LoginLayout/index.jsx"


const publicRoutes = [
    { path: '/login', component: LogInPage, layout: LogIn},
    { path: '/', component: Home},
]
export { publicRoutes }
