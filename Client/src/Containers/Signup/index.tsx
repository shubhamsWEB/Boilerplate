import React from 'react'
import { useForm } from 'react-hook-form'
import {
  passwordFormValidator,
  emailFormValidator,
  confirmPasswordValidator,
  textFormValidator
} from '../../FormValidators/FormValidator'
import CommonForm from '../../Components/CommonForm'
// import { userSignup } from '../../api/actions'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';

type Iprops = {
  setSnackBar: (data:{value:boolean,message:string,type:string}) => void,
  history:{push:Function}
}

export default function Signup({
  setSnackBar,
  history,
}:Iprops) {
  let axios = React.useContext(AxiosContext);
  const {userSignup} = apiCalls(axios)
  const [loading,setLoading] = React.useState(false)
  const { register, handleSubmit, errors, getValues } = useForm({
    mode: 'onChange'
  })
  const SignupFormDetails=[
    {
      name: "name",
      type:"text",
      label:"User Name",
      validator:register(textFormValidator()),
      error:errors.name,
      helperText:errors.name ? errors.name.message : null
    },
    {
    name:"email",
    type:"email",
    label:"Email Address",
    validator:register(emailFormValidator()),
    error:errors.email,
    helperText:errors.email ? errors.email.message : null
    },
  
    {
    name:"password",
    label:"Password",
    type:"password",
    validator:register(passwordFormValidator()),
    error:errors.password,
    helperText:errors.password ? errors.password.message : null
    },
    {
    name:"confirmPassword",
    label:"confirm Password",
    type:"password",
    validator:register(confirmPasswordValidator(getValues)),
    error:errors.confirmPassword,
    helperText:errors.confirmPassword ? errors.confirmPassword.message : null
    }
  ]
  const handleSignupSubmit = async (data:{name:string,email:string,password:string}) => {
    setLoading(true)
    const userData = {
      name:data.name,
      email:data.email,
      password:data.password,
    }
    let response = await userSignup(userData)
    setLoading(false)
    setSnackBar({ value: true, message: response.message, type: 'green' });
    history.push("/login");
  }
  return (
    <CommonForm submitFunction={handleSubmit(handleSignupSubmit)} isLoading={loading} submitButtonName={"signup"} formHeading={"Signup"} formDetails={SignupFormDetails} />
  )
}
