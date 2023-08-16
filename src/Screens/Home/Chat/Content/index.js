import React, {useContext, useEffect, useState}  from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../api/firebase';

import Messages from './Messages';
import Plans from './Plans';
import Presets from './Presets';

const Content = ({id}) => {
  const { chats } = useContext(FirebaseContext);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const currentChat = chats?.find((chat) => chat.id === id);
    setChat(currentChat)
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