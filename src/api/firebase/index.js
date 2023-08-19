import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import CryptoJS from 'crypto-js';
import Constants from 'expo-constants';

import { firestore, auth, storage, arrayUnion, emailProvider } from './config';
import { sendMessageToOpenAI } from '../openai';
import { LocaleContext } from '../../components/locale';

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const {locale} = useContext(LocaleContext);
  const [authUser, setAuthUser] = useState(null);
  const [isAuth, setIsAuth] = useState(null);
  const [appFunc, setAppFunc] = useState(null);
  const [appInfo, setAppInfo] = useState(null);
  const [appStatus, setAppStatus] = useState(null);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [contactsSearch, setContactsSearch] = useState(null);
  const [patchNotes, setPatchNotes] = useState(null);
  const [unreadPatchNotes, setUnreadPatchNotes] = useState(null);

  const secretKey = Constants.manifest.extra.app.secretKeyPhrase;
  
  useEffect(() => {
    const getAuth = auth.onAuthStateChanged(user => {
      setAuthUser(user);
      user?setIsAuth(true):setIsAuth(false);
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

      const getPatch = firestore.collection('patchs').onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatchNotes(data);
      });

      const getUnreadPatchs = firestore.collection('patchs')
        .onSnapshot(async (snapshot) => {
          const patchesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
      
          const docRef = firestore.collection('users').doc(authUser?.uid);
          const doc = await docRef.get();
      
          if (doc.exists) {
            const userData = doc.data();
            const readedPatch = userData.readedPatch || [];
      
            const unreadPatchs = patchesData.filter((patch) => {
              return !readedPatch.some((readed) => readed.id === patch.id);
            });
            
            setUnreadPatchNotes(unreadPatchs);
          }
        });

      const getUser = firestore.collection('users').doc(authUser?.uid).onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUser(data);
        } 
      });

      const getChats = firestore
        .collection('users')
        .doc(authUser?.uid)
        .collection('chats')
        .orderBy('updatedAt', 'desc')
        .onSnapshot(async (querySnapshot) => {
          const promises = [];
      
          querySnapshot.forEach((doc) => {
            const chatsQuerySnapshot = {
              id: doc.id,
              ...doc.data(),
            };
            const info = 'info';
            const chatRef = firestore.collection('app').doc(info)
              .get().then((doc) => {
                const data = doc.data();
                if (chatsQuerySnapshot.friend === data?.uid) {
                  const chatsData = {
                    ...chatsQuerySnapshot,
                    userData: data,
                  };
                  return chatsData;
                } else {
                  const userRef = firestore.collection('users').doc(chatsQuerySnapshot.friend)
                    .get().then((userDoc) => {
                      if (userDoc.exists) {
                        const userData = userDoc.data();
                        const chatsData = {
                          ...chatsQuerySnapshot,
                          userData: userData,
                        };
                        return chatsData;
                      }
                    });
                  return userRef;
                }
              });
            promises.push(chatRef);
          });
      
          const data = await Promise.all(promises);
          const filteredData = data.filter((chatsData) => chatsData !== undefined);
          setChats(filteredData);
        }); 
      
      const getContacts = firestore
        .collection('users')
        .doc(authUser?.uid)
        .collection('contacts')
        .onSnapshot((snapshot) => {
          const contactsData = [];
          snapshot.forEach((doc) => {
            const contactId = doc.id;
            const userRef = firestore.collection('users').doc(contactId);
            userRef.get().then((userDoc) => {
              if (userDoc.exists) {
                const userData = userDoc.data();
                contactsData.push(userData);
                setContacts(contactsData);
              }
            });
          });
        });
      
      return () => {
        getApp();
        getUser();
        getPatch();
        getUnreadPatchs();
        getChats();
        getContacts();
      }
    }
    return () => {
      getAuth();
    }
  }, [authUser, isAuth]);

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  const signUp = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
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
    const timestamp = new Date().toLocaleString();
    const userName = authUser?.email.split("@")[0];
    const credits = 10000;
    
    const userData = {
      uid: authUser?.uid,
      createdAt: authUser?.metadata?.creationTime,
      credits: credits,
      payments: {
        method: 'gift',
        history: [{
          name: 'Free - Beta Test',
          price: 0,
          credits: credits,
          createdAt: timestamp,
        }],
      },
      updatedAt: timestamp,
      displayName: authUser?.displayName? authUser.displayName: userName,
      userName: authUser?.userName?authUser?.userName:'@'+userName,
      email: authUser?.email,
      emailVerified: authUser?.emailVerified,
      photoURL: authUser?.photoURL? authUser?.photoURL: null,
    };

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set(userData, { merge: true });
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
    })

    await putUser();
  };

  const updateDisplayName = async (displayName) => {
    await auth.currentUser.updateProfile({
      displayName: displayName
    })

    const timestamp = new Date().toLocaleString();
    const docRef = firestore.collection('users').doc(authUser?.uid);
    await docRef.set({
      displayName: displayName,
      updatedAt: timestamp,
    }, { merge: true })
  };

  const updateUserName = async (userName) => {
    const timestamp = new Date().toLocaleString();
    const item = '@'+userName;

    const docRef = firestore.collection('users').doc(authUser?.uid);
    await docRef.set({
      userName: item,
      lastNameDate: timestamp,
    }, { merge: true })
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

    await putUser();
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
    const timestamp = new Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    await docRef.set({
      preferences: {
        focus: focusItens,
        interests: interestsItens,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const putContact = async (contact) => {
    const timestamp = new Date().toLocaleString();
    const friendData = {
      uid: contact.uid,
      email: contact.email,
      userName: contact.userName,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const userData = {
      uid: authUser?.uid,
      email: user?.email,
      userName: user?.userName,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  
    await firestore.collection('users').doc(authUser?.uid).collection('contacts').doc(contact.uid).set(friendData);

    const friendRef = firestore.collection('users').doc(contact.uid).collection('contacts').doc(authUser?.uid);
    await friendRef.set(userData);
  };

  const searchContacts = async (contact) => {
    const usersRef = firestore.collection('users');
    const clearContact = contact.replace('@', '');
    const email = clearContact;
    const userName = '@'+clearContact;

    if (clearContact === '') {
      setContactsSearch([]);
      return;
    }

    const emailQuerySnapshot = await usersRef
      .where('email', '>=', email)
      .where('email', '<=', email + '\uf8ff')
      .get();

    const userNameQuerySnapshot = await usersRef
      .where('userName', '>=', userName)
      .where('userName', '<=', userName + '\uf8ff')
      .get();

    const emailResults = emailQuerySnapshot.docs.map((doc) => doc.data());
    const userNameResults = userNameQuerySnapshot.docs.map((doc) => doc.data());

    const mergedResults = mergeResults(emailResults, userNameResults);
    setContactsSearch(mergedResults);
  };
  const mergeResults = (emailResults, userNameResults) => {
    const mergedResults = [...emailResults];
  
    for (const result of userNameResults) {
      if (!mergedResults.some((item) => item.id === result.id)) {
        mergedResults.push(result);
      }
    }
  
    return mergedResults;
  };

  const deleteContact = async (contactId) => {
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('contacts').doc(contactId);
    return await docRef.delete();
  };

  const putCountry = async (iso, name) => {
    const timestamp = new Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    await docRef.set({
      country: {
        iso: iso,
        name: name,
      },
      updatedAt: timestamp,
    }, { merge: true })
  };

  const createPrivateChat = async (text) => {
    const timestamp = new Date().toLocaleString();
    const name = text.substring(0, 50);
    const message = {
      name: name,
      type: 'private',
      owen: authUser?.uid,
      friend: appInfo?.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
      messages: [],
    };
    
    const chatRef = await firestore.collection('users').doc(authUser?.uid).collection('chats').add(message);
    const chatId = chatRef.id;

    return chatId;
  };

  const createUserPrivateMessage = async (chatId, text) => {
    const timestamp = new Date().toLocaleString();
    const name = user?.displayName;
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      uid: authUser?.uid,
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

  const createAiPrivateMessage = async (chatId, text) => {
    const context = locale.global.openai.context;
    const focusMsg = locale.global.openai.focus;
    const interestsMsg = locale.global.openai.interests;
    const error = locale.global.openai.error;
    //dev
    const focus = '';
    const interests = '';
    //dev
    const response = await sendMessageToOpenAI(text, context, focusMsg, focus, interestsMsg, interests);

    const timestamp = new Date().toLocaleString();
    const name = appInfo?.displayName;
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      uid: appInfo?.uid,
      name: name,
      createdAt: timestamp,
      text: response?response:error,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).set(chat, { merge: true }).then(() => {
      firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).update({
        messages: arrayUnion(message),
      });
    });
  };

  const editChat = async (chatId, newName) => {
    const timestamp = new Date().toLocaleString();
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId);
    return await docRef.update({name: newName, updatedAt: timestamp});
  };

  const archivedChat = async (chatId) => {
    const timestamp = new Date().toLocaleString();

    const documentRef = firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId);
    const documentSnapshot = await documentRef.get();
    
    if (documentSnapshot.exists) {
      const archivedDocumentRef = firestore.collection('users').doc(authUser?.uid).collection('archived').doc(chatId);
      await archivedDocumentRef.set(documentSnapshot.data());
      const updatedData = {
        ...documentSnapshot.data(),
        updatedAt: timestamp,
        archivedAt: timestamp
      };
      await archivedDocumentRef.set(updatedData), { merge: true }; 
      await documentRef.delete();
    } else {
      console.log('No such document!');
    }
  };

  const deleteChat = async (chatId) => {
    const docRef = firestore.collection('users').doc(authUser?.uid).collection('archived').doc(chatId);
    return await docRef.delete();
  };

  const createDirectUserChat = async (item) => {
    const timestamp = new Date().toLocaleString();
    const chat = {
      type: 'direct',
      owen: authUser?.uid,
      friend: item,
      createdAt: timestamp,
      updatedAt: timestamp,
      notify: '',
      status: 'online',
      messages: [],
    };

    const chatRef = firestore.collection('users').doc(authUser?.uid).collection('chats');
  
    const chatQuerySnapshot = await chatRef
      .where('owen', '==', authUser?.uid)
      .where('friend', '==', item)
      .get();
  
    if (chatQuerySnapshot.empty) {
      const newChatRef = await chatRef.add(chat);
  
      return newChatRef.id;
    } else {
      return chatQuerySnapshot.docs[0].id;
    }
  };

  const createDirectFriendChat = async (item, chatId) => {
    const timestamp = new Date().toLocaleString();
    const chat = {
      type: 'direct',
      owen: item,
      friend: authUser?.uid,
      createdAt: timestamp,
      updatedAt: timestamp,
      notify: '',
      status: 'online',
      messages: [],
    };
    const chatRef = firestore.collection('users').doc(item).collection('chats');
  
    const chatQuerySnapshot = await chatRef
      .where('owen', '==', item)
      .where('friend', '==', authUser?.uid)
      .get();
  
    if (chatQuerySnapshot.empty) {
      const docID = chatRef.doc(chatId);
      const newChatRef = await docID.set(chat);
  
      return newChatRef.id;
    } else {
      return chatQuerySnapshot.docs[0].id;
    }
  };

  const createUserDirectMessage = async (chatId, friend, text) => {
    const timestamp = new Date().toLocaleString();
    const name = user?.displayName;
    const chat = {
      updatedAt: timestamp,
    };
    const message = {
      uid: authUser?.uid,
      name: name,
      createdAt: timestamp,
      text: text,
    };
    await firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).set(chat, { merge: true }).then(() => {
      firestore.collection('users').doc(authUser?.uid).collection('chats').doc(chatId).update({
        messages: arrayUnion(message),
      });
    });
    await firestore.collection('users').doc(friend?.uid).collection('chats').doc(chatId).set(chat, { merge: true }).then(() => {
      firestore.collection('users').doc(friend?.uid).collection('chats').doc(chatId).update({
        messages: arrayUnion(message),
      });
    });
  };

  const setReadedPatch = async (patchIds) => {
    const timestamp = new Date().toLocaleString();
    const docRef = firestore.collection('users').doc(authUser?.uid);
    const doc = await docRef.get();
  
    if (doc.exists) {
      const userData = doc.data();
      const readedPatch = userData.readedPatch || [];
  
      patchIds.forEach(async (patchId) => {
        const patchExists = readedPatch.some((readed) => readed.id === patchId);
  
        if (!patchExists) {
          readedPatch.push({
            id: patchId,
            date: timestamp,
          });
        }
      });
  
      await docRef.update({
        readedPatch: readedPatch,
        updatedAt: timestamp,
      });
    }
  };

  const editNotify = async (state) => {
    const timestamp = new Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      notify: state,
      updatedAt: timestamp,
    }, { merge: true })
  };

  const editTheme = async (theme) => {
    const timestamp = new Date().toLocaleString();

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      theme: theme,
      updatedAt: timestamp,
    }, { merge: true })
  };

  const putCredits = async () => {
    const timestamp = new Date().toLocaleString();
    const total = user?.credits - 1;

    const docRef = firestore.collection('users').doc(authUser?.uid);
    return await docRef.set({
      credits: total,
      updatedAt: timestamp,
    }, { merge: true })
  };
  
  const value = {
    authUser,
    isAuth,
    appFunc,
    appStatus,
    appInfo,
    patchNotes,
    unreadPatchNotes,
    user,
    contacts,
    contactsSearch,
    chats,
    secretKey,
    signIn,
    signUp,
    emailVerify,
    forgot,
    signOut,
    putUser,
    updateUserPhoto,
    updateDisplayName,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    putPreferences,
    putContact,
    searchContacts,
    deleteContact,
    putCountry,
    createPrivateChat,
    createUserPrivateMessage,
    createAiPrivateMessage,
    editChat,
    archivedChat,
    deleteChat,
    createDirectUserChat,
    createDirectFriendChat,
    createUserDirectMessage,
    setReadedPatch,
    editNotify,
    editTheme,
    putCredits
  };

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired
};