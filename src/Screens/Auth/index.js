import React, { useContext, useEffect, useState} from 'react';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import { LocaleContext } from '/src/components/locale';

import {
  AuthContainer,
  LoadingContainer,
  LoadingText,
} from '../components'
import { navigate } from '../functions';

import News from './News';
import Content from './Content';

const Auth = () => {
  const { isAuth, user } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const [isLoading, setIsLoading] = useState(true);

  const {goHome, goTo} = navigate();
  const name = locale.global.app.name.toUpperCase();
  const isVerify = user?.emailVerified;
  
  useEffect(() => {
    if (isAuth !== null) {
      const isLoged = () => {
        if (isAuth && isVerify) {
          goHome();
          setIsLoading(false);
        } else if (isAuth && !isVerify) {
          const timer = setTimeout(() => {
            goTo('/auth', {state: {route: 'Verify'}});
            setIsLoading(false);
          }, 500);
          return () => clearTimeout(timer);
        } else if (!isAuth) {
          setIsLoading(false);
        }
      }
      
      isLoged();
    }
  }, [isAuth, user]);

  if (isLoading) {
    return (
      <LoadingContainer theme={theme}>
        <LoadingText theme={theme}>{name}</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <AuthContainer theme={theme}>
      <News />
      <Content />
    </AuthContainer>
  );
};

export default Auth;