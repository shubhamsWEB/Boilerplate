import React from 'react'
import { Route, Redirect } from 'react-router-dom'
export default function ProtectedRoute ({
  component: Component,
  appProps,
  functionCall,
  ...rest
}: any) {
  return (
    <Route
      {...rest}
      render={(props: any) => appProps.authFinder
        ?
          <Component {...props} {...appProps} functionCall={functionCall} />
        : 
          <Redirect
            to={appProps.to}
          />}
    />
  );
}
