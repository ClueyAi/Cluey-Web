import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../../api/firebase';
import { LocaleContext } from '../../../components/locale';
import { ThemeContext } from '../../../components/theme';

import { LoadingContainer, LoadingText } from '../../components';

const Loading = () => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {isAuth, isNew, appFunc, user, signOut} = useContext(FirebaseContext);
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState(null);
  const name = locale.global.app.name.toUpperCase();

  const navigate = useNavigate();

  const isVerify = user?.emailVerified;
  
  const selectScreen = async () => {
    if (isAuth) {
      if (!isVerify) {
        setScreen('/auth');
      } else {
        setScreen('/home');
      }
    } else {
      if (!isNew) {
        setScreen('/auth');
      } else {
        setScreen('/auth');
      }
    }
  };

  useEffect(() => {
    if (appFunc?.forceLogoutAll) {
      signOut();
      window.location.reload();
    }
    if (isAuth) {
      selectScreen();
      setIsLoading(false);
      const timer = setTimeout(() => {
        if (!isLoading) {
          navigate(screen);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ screen, selectScreen ]);

  return (
    isLoading ? 
      <LoadingContainer theme={theme}>
        <LoadingText theme={theme}>{name}</LoadingText>
      </LoadingContainer>
      : 
      <LoadingContainer theme={theme}>
        <LoadingText theme={theme}>{name}</LoadingText>
      </LoadingContainer>
  );
};

export default Loading;
