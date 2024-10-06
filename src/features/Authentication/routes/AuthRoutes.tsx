import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load các component con
// eslint-disable-next-line @typescript-eslint/promise-function-async
const SignIn = lazy(() => import('../page/SignIn'))
// const Register = lazy(() => import('./Register'));
const AuthRoutes = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading Auth...</div>}>
      <Routes>
        <Route path='login' element={<SignIn />} />
      </Routes>
    </Suspense>
  )
};

export default AuthRoutes;
