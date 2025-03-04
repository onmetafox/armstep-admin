import React, {Suspense} from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

import {AuthContextProvider} from "./providers/authContext";
import {AlertContextProvider} from "./providers/alertContext";

import './scss/style.scss'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export default function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <AlertContextProvider>
          <AuthContextProvider>
            <Routes>
              <Route exact path="/login" name="Login Page" element={<Login/>}/>
              <Route exact path="/register" name="Register Page" element={<Register/>}/>
              <Route exact path="/404" name="Page 404" element={<Page404/>}/>
              <Route exact path="/500" name="Page 500" element={<Page500/>}/>
              <Route path="*" name="Home" element={<DefaultLayout/>}/>
            </Routes>
            }
          </AuthContextProvider>
        </AlertContextProvider>
      </Suspense>
    </BrowserRouter>
  )
}

