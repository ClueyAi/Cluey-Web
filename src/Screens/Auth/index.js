import React, { useContext, useEffect} from 'react';
import { FirebaseContext } from '/src/api/firebase';

import {
  AuthContainer,
} from '../components'
import { navigate } from '../functions';

import News from './News';
import Content from './Content';

const Auth = () => {
  const { isAuth, user } = useContext(FirebaseContext);

  const {goTo} = navigate();
  const isVerify = user?.emailVerified;
  
  useEffect(() => {
    const isLoged = async () => {
      if (isAuth && isVerify) {
        goTo('/');
      } 
    }

    isLoged();
  }, [isAuth, isVerify]);

  return (
    <AuthContainer>
      <News />
      <Content />
    </AuthContainer>
  );
};

export default Auth;