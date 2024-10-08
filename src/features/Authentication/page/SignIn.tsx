import React from 'react'
import NavbarLogin from '../../../shared/components/NavbarLogin/NavbarLogin'
import MainSignIn from '../components/SignInView/SignInView'
import { SignInView } from '../components/SignInView/SignInView'


const SignIn = () => {
  return (
    <div>
      <div>
        <NavbarLogin />
        <MainSignIn />
      </div>
    </div>
  )
}

export default SignIn
