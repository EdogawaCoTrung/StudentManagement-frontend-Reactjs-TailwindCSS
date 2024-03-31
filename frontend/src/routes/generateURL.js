import Home from "../pages/Home"
import {pages} from '../assets/PagesName'

function generateURL (Routes) {
    for (const page of pages) {
    let encodedPage = "/" + page;
    Routes.push({path: encodedPage, component: Home});
    }
}

export {generateURL}
