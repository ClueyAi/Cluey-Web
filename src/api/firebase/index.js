import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { firestore, auth, storage, arrayUnion, emailProvider } from './config';
import { sendMessageToOpenAI } from '../openai';
import { LocaleContext } from '../../components/locale';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const {locale} = useContext(LocaleContext);
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const notNew = async () => {AsyncStorage.setItem('isNewUser', 'false')};
  const [app, setApp] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [talks, setTalks] = useState(null);
  const [whisps, setWhisps] = useState(null);

  const secretKey = Constants.manifest.extra.app.secretKeyPhrase;
  
  useEffect(() => {
    const getAuth = auth.onAuthStateChanged(user => {
      setAuthUser(user);
      user?setIsAuth(true):setIsAuth(false);
      user?.emailVerified?setIsVerify(true):setIsVerify(false);
    });

    const isNewUser = AsyncStorage.getItem('isNewUser').then((value) => {
      if (value === 'false') {
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    });

    if (isAuth) {
      const getApp = firestore.collection('app').doc('info').onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setApp(data);
        }
      });

      const getUser = firestore.collection('users').doc(authUser?.uid).onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUser(data);
        } 
      });
       
      const getChats = firestore.collection('users').doc(authUser?.uid).collection('chats').orderBy('updatedAt', 'desc').onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(data);
      });

      return () => {
        getApp();
        getUser();
        getChats();
      }
    }
    return () => {
      getAuth();
      isNewUser
    }
  }, [authUser, isAuth]);

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
      notNew();
      putUser();
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
      putUser();
      emailVerify();
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

  const emailVerify = async () => {
    return await auth.currentUser.sendEmailVerification();
  };

  const forgot = async (email) => {
    return await auth.sendPasswordResetEmail(email);
  };

  const signOut = async () => {
    return auth.signOut();
  };

  const putUser = async () => {
    const timestamp = Date().toLocaleString();
    const name = authUser?.email.split("@")[0];

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      uid: authUser?.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
      profile: {
        displayName: authUser.displayName?authUser.displayName: name,
        email: authUser.email,
        emailVerified: authUser.emailVerified,
        photoURL: authUser.photoURL? authUser.photoURL: null,
      },
    }, { merge: true })
  };

  const updateUserPhoto = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`public/${authUser?.uid}/photoURL.jpg`);
    const snapshot = await fileRef.put(blob);
  
    const photoURL = await snapshot.ref.getDownloadURL();
  
    return await auth.currentUser.updateProfile({
      photoURL: photoURL
    });
  };

  const updateUserName = async (displayName) => {
    return await auth.currentUser.updateProfile({
      displayName: displayName
    });
  };

  const updateUserEmail = async (password, newEmail) => {
    const credential = emailProvider.credential(
      authUser.email,
      password
    );
    await auth.currentUser.reauthenticateWithCredential(credential);
    await auth.currentUser.updateEmail(newEmail);
    await auth.currentUser.sendEmailVerification({
      locale: locale.language.locale
    });
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const credential = emailProvider.credential(
      authUser.email,
      currentPassword
    );
    await authUser.reauthenticateWithCredential(credential);
    await authUser.updatePassword(newPassword);
  };
  
  const putPreferences = async (focusItens, interestsItens) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      preferences: {
        focus: focusItens,
        interests: interestsItens,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const getContacts = async () => {
    if (user?.contacts.length > 0) {
      const querySnapshot = await firestore.collection('users')
        .where('profile.email', 'in', user?.contacts)
        .get();
    
      const contactsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });
  
      setContacts(contactsData);
    }
  };

  const putContact = async (contact) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.update({
      contacts: arrayUnion(contact),
      updatedAt: timestamp,
    })
  };

  const putCountry = async (iso, name) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      country: {
        iso: iso,
        name: name,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const createChat = async (text) => {
    const timestamp = Date().toLocaleString();
    const name = text.substring(0, 55);
    const chat = {
      name: name,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    return await firestore.collection('users').doc(authUser?.uid).collection('chats').add(chat);
  };

  const createUserMessage = async (chatId, text) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).set(chat, { merge: true }).then(() => {
      firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).update({
        messages: arrayUnion(message),
      });
    });
  };

  const createAiMessage = async (chatId, text) => {
    const response = await sendMessageToOpenAI(text);
    const timestamp = Date().toLocaleString();
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      name: 'Cluey',
      createdAt: timestamp,
      text: response,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).set(chat, { merge: true }).then(() => {
      firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).update({
        messages: arrayUnion(message),
      });
    });
  };

  const editChat = async (chatId, newName) => {
    const timestamp = Date().toLocaleString();
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId);
    return await docRef.update({name: newName, updatedAt: timestamp});
  };

  const deleteChat = async (chatId) => {
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId);
    return await docRef.delete();
  };

  const getTalks = async () => {
    if (user?.contacts?.length > 0) {
      const talksCollection = await firestore.collection('users').doc(authUser?.uid).collection('talks')
        .where('emailFriend', 'in', user?.contacts)
        .get();
    
      const talks = talksCollection.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      const usersCollection = await firestore.collection('users')
        .where('profile.email', 'in', user?.contacts)
        .get();
    
      const users = usersCollection.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      const combinedData = talks.map((talk) => {
        const userData = users.find((user) => user.profile.email === talk.emailFriend);
        return { talk, userData };
      });

      setTalks(combinedData);
    }
  };

  const createTalk = async (email) => {
    const timestamp = Date().toLocaleString();
    const chat = {
      emailUser: authUser?.email,
      emailFriend: email,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    const friendChat = {
      emailUser: email,
      emailFriend: authUser?.email,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    const chatRef = firestore.collection('users').doc(authUser?.uid).collection('talks')
    const talk = await chatRef
      .where('emailFriend', '==', email)
      .where('emailUser', '==', authUser?.email)
      .get();

    const friendRef = firestore.collection('users')
      .where('profile.email', '==', email)
      .get();

    if (talk.docs.length === 0) {
      const newTalkRef = await chatRef.add(chat);
      
      const friendQuerySnapshot = await friendRef;
      const friendDoc = friendQuerySnapshot.docs[0];
      const friendTalkRef = firestore.collection('users').doc(friendDoc.id).collection('talks').doc(newTalkRef.id);
      await friendTalkRef.set(friendChat);

      return newTalkRef.id;
    } else {
      return talk.docs[0].id;
    }
  };

  const getWhisps = async (id) => {
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('talks').doc(id);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      const data = docSnapshot.data();
      setWhisps(data);
    }
  };

  const createUserWhisp = async (talkId, email, text) => {
    const timestamp = Date().toLocaleString();
    const talk = {
      updatedAt: timestamp,
    };
    const message = {
      idUser: authUser?.uid,
      createdAt: timestamp,
      text: text,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('talks').doc(talkId).set(talk, { merge: true }).then(() => {
      firestore.collection('users').doc(authUser?.uid).collection('talks').doc(talkId).update({
        messages: arrayUnion(message),
      });
    });

    const friendRef = firestore.collection('users')
      .where('profile.email', '==', email)
      .get();
      
    const friendQuerySnapshot = await friendRef;
    const friendDoc = friendQuerySnapshot.docs[0];

    await firestore.collection('users').doc(friendDoc.id).collection('talks').doc(talkId).set(talk, { merge: true }).then(() => {
      firestore.collection('users').doc(friendDoc.id).collection('talks').doc(talkId).update({
        messages: arrayUnion(message),
      });
    });
  };
  
  const value = {
    authUser,
    isAuth,
    isVerify,
    isNew,
    app,
    user,
    contacts,
    chats,
    talks,
    whisps,
    secretKey,
    signIn,
    signUp,
    emailVerify,
    forgot,
    signOut,
    putUser,
    updateUserPhoto,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    putPreferences,
    getContacts,
    putContact,
    putCountry,
    createChat,
    createUserMessage,
    createAiMessage,
    editChat,
    deleteChat,
    getTalks,
    createTalk,
    getWhisps,
    createUserWhisp,
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired
};