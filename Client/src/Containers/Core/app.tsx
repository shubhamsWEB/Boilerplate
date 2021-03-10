import { ThemeProvider } from '@material-ui/core'
import Theme from '../../Themes/MuiTheme'
import Signup from '../Signup'
import Login from '../Login'
import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../../ProtectedRoutes/ProtectedRoute'
import Navbar from '../../Components/Navbar'
import Dashboard from '../Dashboard'
import QuickMatch from '../QuickMatch'
import SingleMatch from '../SingleMatch'
import MySubscriptions from '../MySubscriptions'
import AdminDashboard from '../AdminDashboard/'
import useLocalStorage from '../../customHooks/useLocalStorage'
import VerifyUser from '../../Containers/VerifyUser'
import Snackbar from '../../Components/SnackBar'
import RespondToChallenge from '../RespondToChallenge'
import ChallengeAccepted from '../ChallengeAccepted'

import ChallengeMatch from '../Challenge'
function App() {
  const [loginAuthenticated, setLoginAuthenticated] = useLocalStorage(
    'isLoggedIn',
    false
  )
  const [loggedinUser, setLoggedinUser] = useLocalStorage('user', {})
  const [snackBar, setSnackBar] = useState({
    value: false,
    message: '',
    type: '',
  })
  return (
    <ThemeProvider theme={Theme}>
      <Navbar
        authFinder={loginAuthenticated}
        setLoginAuthenticated={setLoginAuthenticated}
        setLoggedinUser={setLoggedinUser}
        setSnackBar={setSnackBar}
      />
      <Snackbar
        isOpen={snackBar.value}
        setIsOpen={setSnackBar}
        message={snackBar.message}
        type={snackBar.type}
      />

      <Switch>
        <Route
          exact
          path='/'
          render={(props: any) => (
            <Dashboard {...props} loggedinUser={loggedinUser} />
          )}
        />
        <ProtectedRoute
          exact
          path='/login'
          component={Login}
          appProps={{
            authFinder: !loginAuthenticated,
            to: '/',
            setLoginAuthenticated: setLoginAuthenticated,
            setLoggedinUser: setLoggedinUser,
            setSnackBar: setSnackBar,
          }}
        />
        <ProtectedRoute
          exact
          path='/respond/challenge/:id/:teamName/:teamAId/:teamBId'
          component={RespondToChallenge}
          appProps={{
            authFinder: loginAuthenticated,
            to: '/login',
            loggedinUser: loggedinUser,
            
          }}
        />
        <ProtectedRoute
          exact
          path='/challenge/callback/:matchId/:teamAName/:teamBName/:teamAId/:teamBId'
          component={ChallengeAccepted}
          appProps={{
            authFinder: loginAuthenticated,
            to: '/login',
            loggedinUser: loggedinUser,
            
          }}
        />
        <ProtectedRoute
          exact
          path='/signup'
          component={Signup}
          appProps={{
            authFinder: !loginAuthenticated,
            to: '/',
            setSnackBar: setSnackBar,
            
          }}
        />
        <Route
          exact
          path='/match/:id'
          render={(props: any) => (
            <SingleMatch {...props} loggedinUser={loggedinUser}  />
          )}
        />
        <ProtectedRoute
          exact
          path='/subscriptions'
          component={MySubscriptions}
          appProps={{
            authFinder: loginAuthenticated,
            to: '/login',
            loggedinUser: loggedinUser,
            
          }}
        />
        <ProtectedRoute
          exact
          path='/quickmatch'
          component={QuickMatch}
          appProps={{ authFinder: loginAuthenticated, to: '/',  }}
        />
        <ProtectedRoute
          exact
          path='/challengematch'
          component={ChallengeMatch}
          appProps={{ authFinder: loginAuthenticated, to: '/',  }}
        />
        <ProtectedRoute
          exact
          path='/quickmatch/:id'
          component={AdminDashboard}
          appProps={{
            authFinder: loginAuthenticated,
            to: '/',
            loggedinUser: loggedinUser,
            setLoginAuthenticated: setLoginAuthenticated,
            setLoggedinUser: setLoggedinUser,
            setAppSnakBar: setSnackBar,
            
          }}
        />
        <ProtectedRoute
          exact
          path='/verifyemail/:id'
          component={VerifyUser}
          appProps={{ authFinder: !loginAuthenticated, to: '/' }}
        />
      </Switch>
    </ThemeProvider>
  )
}
export default App
