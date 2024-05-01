import { Fragment } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import { DefaultLayout } from "./components/Layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
function App() {
  return (
    <>
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

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
