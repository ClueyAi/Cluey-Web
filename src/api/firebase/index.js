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
  const [isNew, setIsNew] = useState(true);
  const [appFunc, setAppFunc] = useState(null);
  const [appInfo, setAppInfo] = useState(null);
  const [appStatus, setAppStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [talks, setTalks] = useState(null);
  const [talk, setTalk] = useState(null);

  const secretKey = Constants.manifest.extra.app.secretKeyPhrase;

  const notNew = async () => {AsyncStorage.setItem('isNewUser', 'false')};
  
  useEffect(() => {
    const getAuth = auth.onAuthStateChanged(user => {
      setAuthUser(user);
      user?setIsAuth(true):setIsAuth(false);
      putUser();
    });

    const isNewUser = AsyncStorage.getItem('isNewUser').then((value) => {
      if (value === 'false') {
        setIsNew(false);
      } else {
        setIsNew(true);
      }
    });

    if (isAuth) {
      const getApp = firestore.collection('app').onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppFunc(data[0])
        setAppInfo(data[1]);
        setAppStatus(data[2])
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
      
      const getContacts = firestore.collection('users').doc(authUser?.uid).collection('contacts').orderBy('updatedAt', 'desc').onSnapshot(async (querySnapshot) => {
        const data = [];
        for (const doc of querySnapshot.docs) {
          const contactEmail = doc.id;
          const contactRef = firestore.collection('users').where('profile.email', '==', contactEmail);
          const contactQuerySnapshot = await contactRef.get();
          if (!contactQuerySnapshot.empty) {
            const contactDoc = contactQuerySnapshot.docs[0];
            const contactData = contactDoc.data();
            const contact = {
              id: doc.id,
              contactData: contactData,
            };
            data.push(contact);
          }
        }
        setContacts(data);
      });
      
      const getTalks = firestore.collection('users').doc(authUser?.uid).collection('talks').orderBy('updatedAt', 'desc').onSnapshot(async (querySnapshot) => {
        const data = [];
        for (const doc of querySnapshot.docs) {
          const talk = {
            id: doc.id,
            ...doc.data(),
          };
      
          const userRef = firestore.collection('users').where('profile.email', '==', talk.emailFriend);
          const userQuerySnapshot = await userRef.get();
          if (!userQuerySnapshot.empty) {
            const userDoc = userQuerySnapshot.docs[0];
            const userData = userDoc.data();
            const talkData = {
              ...talk,
              userData: userData,
            };
      
            data.push(talkData);
          }
        }
      
        setTalks(data);
      });

      const getTalk = firestore.collection('users').doc(authUser?.uid).collection('talks').orderBy('updatedAt', 'desc').onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTalk(data[0]);
      });

      return () => {
        getApp();
        getUser();
        getChats();
        getContacts();
        getTalks();
        getTalk();
      }
    }
    return () => {
      getAuth();
      isNewUser
    }
  }, [authUser, isAuth]);

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password).then(() => {
      if ('credentials' in navigator) {
        // eslint-disable-next-line no-undef
        navigator.credentials.store(new PasswordCredential({
          id: email,
          password: password,
          name: 'Cluey'
        }))
      }
    })
  };

  const signUp = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password).then(() => {
      if ('credentials' in navigator) {
        // eslint-disable-next-line no-undef
        navigator.credentials.store(new PasswordCredential({
          id: email,
          password: password,
          name: 'Cluey'
        }))
      }
    })
  };

  const emailVerify = async () => {
    return await auth.currentUser.sendEmailVerification()
  };

  const forgot = async (email) => {
    return await auth.sendPasswordResetEmail(email);
  };

  const signOut = async () => {
    return auth.signOut();
  };

  const putUser = async () => {
    const timestamp = Date().toLocaleString();
    const userName = authUser?.email.split("@")[0];

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      uid: authUser?.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
      profile: {
        displayName: authUser.displayName? authUser.displayName: userName,
        userName: '@'+userName,
        email: authUser.email,
        emailVerified: authUser.emailVerified,
        photoURL: authUser.photoURL? authUser.photoURL: null,
      },
    }, { merge: true })
  };

  const updateUser = async () => {
    const timestamp = Date().toLocaleString();
    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      updatedAt: timestamp,
    }, { merge: true })
  };

  const updateUserPhoto = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
  
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`public/${authUser?.uid}/photoURL.jpg`);
    const snapshot = await fileRef.put(blob);
  
    const photoURL = await snapshot.ref.getDownloadURL();
  
    await auth.currentUser.updateProfile({
      photoURL: photoURL
    }).then(() => {
      updateUser();
    });
  };

  const updateUserName = async (displayName) => {
    await auth.currentUser.updateProfile({
      displayName: displayName
    }).then(() => {
      updateUser();
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
    }).then(() => {
      updateUser();
    });
  };

  const updateUserPassword = async (currentPassword, newPassword) => {
    const credential = emailProvider.credential(
      authUser.email,
      currentPassword
    );
    await authUser.reauthenticateWithCredential(credential);
    await authUser.updatePassword(newPassword);
    updateUser();
  };
  
  const putPreferences = async (focusItens, interestsItens) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    await docRef.set({
      preferences: {
        focus: focusItens,
        interests: interestsItens,
      },
      updatedAt: timestamp,
    }, { merge: true })
    updateUser();
  };

  const putContact = async (contact) => {
    const timestamp = Date().toLocaleString();
    const data = {
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  
    const contactsSnapshot = await firestore.collection('users').doc(authUser?.uid).collection('contacts').doc(contact).get();
    const friendSnapshot = await firestore.collection('users').where('profile.email', '==', contact).get();
  
    if (!contactsSnapshot.exists && authUser?.email !== contact) {
      await firestore.collection('users').doc(authUser?.uid).collection('contacts').doc(contact).set(data);
  
      const friendDoc = friendSnapshot.docs[0];
      const friendTalkRef = firestore.collection('users').doc(friendDoc.id).collection('contacts').doc(authUser?.email);
      await friendTalkRef.set(data);
    }
  
    updateUser();
  };

  const putCountry = async (iso, name) => {
    const timestamp = Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    await docRef.set({
      country: {
        iso: iso,
        name: name,
      },
      updatedAt: timestamp,
    }, { merge: true })
    ();
    updateUser();
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
    
    await firestore.collection('users').doc(authUser?.uid).collection('chats').add(chat);
    updateUser();
  };

  const createUserMessage = async (chatId, text) => {
    const timestamp = Date().toLocaleString();
    const id = Math.random().toString(36).substring(7);
    const name = user?.profile.userName;
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      id: id,
      name: name,
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
    const id = Math.random().toString(36).substring(7);
    const name = appInfo?.userName;
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      id: id,
      name: name,
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

      updateUser();
      return newTalkRef.id;
    } else {
      return talk.docs[0].id;
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
    isNew,
    appFunc,
    appStatus,
    appInfo,
    user,
    contacts,
    chats,
    talks,
    talk,
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
    putContact,
    putCountry,
    createChat,
    createUserMessage,
    createAiMessage,
    editChat,
    deleteChat,
    createTalk,
    createUserWhisp,
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired
};