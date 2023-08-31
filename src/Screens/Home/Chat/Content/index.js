import React, {useContext, useEffect, useState}  from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../api/firebase';
import { firestore } from '../../../../api/firebase/config';

import Messages from './Messages';
import Plans from './Plans';
import Presets from './Presets';

const Content = ({id}) => {
  const { user, chats } = useContext(FirebaseContext);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const currentChat = chats?.find((chat) => chat.id === id);
    setChat(currentChat)

    if (currentChat) {
      const chatRef = firestore.collection('users').doc(user?.uid).collection('chats').doc(id);

      //Dev
      const unsubscribe = chatRef.onSnapshot((doc) => {
        const messages = doc.data().messages || [];
        const lastMessage = messages[messages.length - 1];

        if (lastMessage && !lastMessage.read) {
          if ('Notification' in window) {
            if (Notification.permission === 'granted') {
              new Notification(lastMessage.name, {
                body: lastMessage.text,
              });
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                  new Notification(lastMessage.name, {
                    body: lastMessage.text,
                  });
                }
              });
            }
          }
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [chats, id]);
  
  if (chat) {
    return (
      <Messages chat={chat} />
    );
  }

  return (
    <Presets />
  );

};

Content.propTypes = {
  id: PropTypes.string
};

export default Content;