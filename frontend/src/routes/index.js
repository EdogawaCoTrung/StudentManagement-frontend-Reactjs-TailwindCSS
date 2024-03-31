import Home from "../pages/Home"
import LogInPage from "../pages/Login/index.jsx"
import LogIn from "../components/Layout/LoginLayout/index.jsx"
import { generateURL } from "./generateURL.js"


const publicRoutes = [
    { path: '/login', component: LogInPage, layout: LogIn},
    { path: '/', component: Home},
]

generateURL(publicRoutes);

export { publicRoutes }
