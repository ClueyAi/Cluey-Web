import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from "prop-types";

import { auth } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isNew, setIsNew] = useState(true);
  const notNew = async () => {AsyncStorage.setItem('isNewUser', 'false')};

  useEffect(() => {
    const unsubscribe = AsyncStorage.getItem('isNewUser').then((value) => {
      if (value === 'false') {
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    });

    return () =>  unsubscribe
  }, []);

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
      notNew();
      if ('credentials' in navigator) {
        // eslint-disable-next-line no-undef
        navigator.credentials.store(new PasswordCredential({
          id: email,
          password: password,
          name: 'Cluey'
        }))
      }
    });
  };

  const signUp = async (email, password) => {
    return await auth.createUserWithEmailAndPassword(email, password).then(() => {
      notNew();
      emailVerify();
      if ('credentials' in navigator) {
        // eslint-disable-next-line no-undef
        navigator.credentials.store(new PasswordCredential({
          id: email,
          password: password,
          name: 'Cluey'
        })).then(() => {
          console.log('Credentials seved!');
        }).catch((error) => {
          console.error('Error to credentials seve:', error);
        });
      }
    });
  };

  const emailVerify = async () => {
    return await auth.currentUser.sendEmailVerification();
  };

  const forgot = async (email) => {
    return await auth.sendPasswordResetEmail(email);
  };

  const signOut = async () => {
    return auth.signOut();
  };

  const value = {
    isNew,
    signIn,
    signUp,
    emailVerify,
    forgot,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};