import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import { LocaleContext } from '/src/components/locale';

import {
  AccountContainer,
  LoadingContainer,
  LoadingText,
} from '../components';
import { navigate } from '../functions';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Account = () => {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const { isAuth, user } = useContext(FirebaseContext);
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const {goAuth} = navigate();
  const name = locale.global.app.name.toUpperCase();

  const handleSelected = (item) => {
    setSelected(item);
  };
  
  useEffect(() => {
    if (isAuth !== null) {
      const isLoged = () => {
        if (!isAuth && !user) {
          const timer = setTimeout(() => {
            goAuth();
            setIsLoading(false);
          }, 500);
          return () => clearTimeout(timer);
        } else if (isAuth) {
          setIsLoading(false);
        }
      }
      
      isLoged();
    }
  }, [isAuth]);

  if (isLoading) {
    return (
      <LoadingContainer theme={theme}>
        <LoadingText theme={theme}>{name}</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <AccountContainer theme={theme}>
      <Header selected={selected} handleSelected={handleSelected} />
      <Content selected={selected} />
      <Footer />
    </AccountContainer>
  );
};

export default Account;