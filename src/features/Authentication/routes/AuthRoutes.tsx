import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../page/SignUp';
import Verification from '../page/Verification';
import CheckEmail from '../page/CheckEmail';
import RePassword from '../page/RePassword';
import CreatePassword from '../page/CreatePassword';

// Lazy load các component con
// eslint-disable-next-line @typescript-eslint/promise-function-async
const SignIn = lazy(() => import('../page/SignIn'))
// const Register = lazy(() => import('./Register'));
const AuthRoutes = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading Auth...</div>}>
      <Routes>
        <Route path='login' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<CreatePassword />} />
        <Route path='checkemail' element={<CheckEmail />} />
        <Route path='repassword' element={<RePassword />} />
        <Route path='verification' element={<Verification />} />
      </Routes>
    </Suspense>
  )
};

export default AuthRoutes;
