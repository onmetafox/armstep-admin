import React from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ path, component: Component }) => {
  const authRole = useSelector(state => state.auth.role)

  if(!authRole)
    return <Redirect to="/sign_in" />

  return <Route path={ path } component={ Component } />
}

export default ProtectedRoute
