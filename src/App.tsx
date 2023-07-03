import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { MainPage } from "./pages/mainPage"
import { ErrorPage } from "./pages/errorPage"
import { Fragment } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Table } from "./components/table"
import { UserSettings } from "./components/userSettings"
import { CompareSelector } from "./components/compareSelector"
import { darkTheme } from "./theme"


const router = createBrowserRouter([

  {
    path: '/',
    element: <MainPage/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'table/:id',
        element: <Table/>
      },
      {
        path:'settings',
        element: <UserSettings/>
      },
      {
        path:'edit:id',
        element:<span>Edit</span>
      },
      {
        path:'',
        element:<CompareSelector/>
      },
      {
        path: '*',
        element: <span>page not found</span>
      },
  ]
  },
  {
    path: '/*',
    element: <Navigate to='/' />,
  },
])

const App = () => {

  return (
    <Fragment>
      <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router}/>
      </ThemeProvider>
    </Fragment>

  )
}

export default App
