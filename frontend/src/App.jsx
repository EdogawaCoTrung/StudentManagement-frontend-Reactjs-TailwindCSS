import { Fragment } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { publicRoutes, LoginRoute, StudentRoutes, OfficerRoutes, TeacherRoutes } from "./routes"
import { DefaultLayout } from "./components/Layout"
import { ToastContainer } from "react-toastify"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "react-toastify/dist/ReactToastify.min.css"
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div id="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component

              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return <Route exact key={index} path={route.path} element={<Layout>{Page}</Layout>} />
            })}
            {LoginRoute.map((route, index) => {
              const Page = route.component

              {
                /* let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              } */
              }

              return <Route exact key={index} path={route.path} element={<Page></Page>} />
            })}
            {StudentRoutes.map((route, index) => {
              const Page = route.component

              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return <Route exact key={index} path={route.path} element={<Layout>{Page}</Layout>} />
            })}
            {OfficerRoutes.map((route, index) => {
              const Page = route.component

              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return <Route exact key={index} path={route.path} element={<Layout>{Page}</Layout>} />
            })}
            {TeacherRoutes.map((route, index) => {
              const Page = route.component

              let Layout = DefaultLayout
              if (route.layout) {
                Layout = route.layout
              } else if (route.layout === null) {
                Layout = Fragment
              }

              return <Route exact key={index} path={route.path} element={<Layout>{Page}</Layout>} />
            })}
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default App
