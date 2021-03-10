import React from 'react'
import { useForm } from 'react-hook-form'
import CommonForm from '../../Components/CommonForm'
// import { userLogin } from '../../api/actions'
// import { getSubscribedMatches } from '../../api/subscription'
import {apiCalls} from 'crickboardapi';
import { addDays } from '../../utils/addDays'
import AxiosContext from '../../context/axios';
import {
  emailFormValidator,
  passwordFormValidator,
} from '../../FormValidators/FormValidator'
import { useCrickStore } from '../../store'

type Iprops = {
  setSnackBar: (data: { value: boolean; message: string; type: string }) => void
  setLoggedinUser: (data: {
    userId: string
    userName: string
    expiredDate: Date
  }) => void
  setLoginAuthenticated: (data: boolean) => void
  location: { verified: { value: boolean; message: string; type: string } }
}

export default function Login({
  setSnackBar,
  setLoggedinUser,
  setLoginAuthenticated,
  location
}: Iprops) {
  let axios = React.useContext(AxiosContext);

  const [loading, setLoading] = React.useState(false)
  const { register, handleSubmit, errors } = useForm({
    mode: 'onChange',
  })
  const {getSubscribedMatches,userLogin} =apiCalls(axios);
  const { saveSubscription } = useCrickStore()
  const loginFormDetails = [
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      error: errors.email,
      validator: register(emailFormValidator()),
      helperText: errors.email ? errors.email.message : null,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validator: register(passwordFormValidator()),
      error: errors.password,
      helperText: errors.password ? errors.password.message : null,
    },
  ]
  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true)
    const email = data.email
    const password = data.password
    const userDetails = {
      email,
      password,
    }
    let userData = await userLogin(userDetails)
    console.log(userData)
    if (userData.data) {
      let subscribedMatches = await getSubscribedMatches(userData.data.userId)
      saveSubscription(subscribedMatches.data)
    setSnackBar({ value: true, message: userData.message, type: 'red' })
      const date = new Date()
      setLoggedinUser({
        userId: userData.data.userId,
        userName: userData.data.userName,
        expiredDate: addDays(date, 2),
      })
      setLoginAuthenticated(true)
      setSnackBar({
        value: true,
        message: 'User Logged In Successfully',
        type: 'green',
      })
      setLoading(false)
    }
    else {
      setSnackBar({ value: true, message: userData.message, type: 'red' })
      setLoading(false)
    }
  }

  if (location.verified) {
    setSnackBar(location.verified)
  }
  return (
    <CommonForm
      submitFunction={handleSubmit(handleLogin)}
      isLoading={loading}
      submitButtonName={'login'}
      formHeading={'Login'}
      formDetails={loginFormDetails}
    />
  )
}
