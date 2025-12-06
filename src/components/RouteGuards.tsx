import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'

type PublicRouteProps = RouteProps & { restricted?: boolean }

// PublicRoute: if `restricted` is true and user is authenticated
export const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, restricted = false, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated() && restricted ? (
          <Redirect to="/home/admin" />
        ) : Component ? (
          // @ts-ignore
          <Component {...props} />
        ) : null
      )}
    />
  )
}

// PrivateRoute: if not authenticated, redirect to /login
export const PrivateRoute: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        isAuthenticated() ? (
          Component ? (
            // @ts-ignore
            <Component {...props} />
          ) : null
        ) : (
          <Redirect to="/login" />
        )
      )}
    />
  )
}

export default { PublicRoute, PrivateRoute }
