import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../../components/theme';
import { LocaleContext } from '../../components/locale';
import { FirebaseContext } from '../../api/firebase';

import { LoadingContainer, LoadingText, HomeContainer, PatchNotes, Preferences } from '../components';
import { patchnote, navigate } from '../functions';

import Menu from './Menu';
import Chat from './Chat';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { locale } = useContext(LocaleContext);
  const { isAuth, user, appStatus, appFunc, signOut, unreadPatchNotes, setReadedPatch } = useContext(FirebaseContext);
  const { newPatch, newPatchOptions, patch } = patchnote();
  const [isLoading, setIsLoading] = useState(true);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [VPreferences, setVPreferences] = useState(false);

  const {goTo} = navigate();
  const name = locale.global.app.name.toUpperCase();
  const isVerify = user?.emailVerified;
  const hasPreferences = user?.preferences;
  const hasNewUpdate = appStatus?.newUpdate;
  
  useEffect(() => {
    if (appFunc?.forceLogoutAll) {
      signOut();
      window.location.reload();
    }

    if (isAuth && isVerify && hasPreferences && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isAuth && isVerify && !hasPreferences && isLoading) {
      const timer = setTimeout(() => {
        setVPreferences(true);
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (isAuth && !isVerify && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        goTo('/auth', {state: {route: 'Verify'}});
      }, 1500);
      return () => clearTimeout(timer);
    } else if (!isAuth && !isVerify && isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        goTo('/auth', {state: {route: 'Login'}});
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (hasPreferences && hasNewUpdate && unreadPatchNotes?.length > 0) {
      setHasUpdate(true);
      patch(unreadPatchNotes, locale);
    }
    
  }, [isAuth, appFunc, hasPreferences, isVerify, unreadPatchNotes, isLoading]);
  
  if (isLoading) {
    return (
      <LoadingContainer theme={theme}>
        <LoadingText theme={theme}>{name}</LoadingText>
      </LoadingContainer>
    );
  }

  if (!isLoading && isAuth) {
    return (
      <HomeContainer theme={theme}>
        {VPreferences?<Preferences setVPreferences={setVPreferences} />:null}
        {hasUpdate?<PatchNotes data={newPatch} options={newPatchOptions} setHasUpdate={setHasUpdate} setReadedPatch={setReadedPatch} />:null}
        <Menu/>
        <Chat/>
      </HomeContainer>
    );
  }

};

export default Home;