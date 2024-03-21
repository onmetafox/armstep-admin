import React, {Suspense, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CContainer, CSpinner} from '@coreui/react'

// routes config
import routes from '../routes';

function ProtectedRoute({loggedIn, children}) {

  if (!loggedIn) {
    return (
      <Navigate to="/login" replace={true}/>
    );
  }

  return children;
}

const AppContent = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') !== null);
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary"/>}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<ProtectedRoute loggedIn={loggedIn}>
                    <route.element/>
                  </ProtectedRoute>}
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
