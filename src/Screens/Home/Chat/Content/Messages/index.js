import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { MessagesContainer } from '../../../../components';

import Message from './Message';

const Messages = ({chat}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chat) {
      const reversedMessages = [...chat.messages].reverse();
      setMessages(reversedMessages);
    }
  }, [chat, ]);

  return (
    <MessagesContainer>
      {messages ? 
        <FlatList
          data={messages}
          style={{width: '100%'}}
          inverted
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Message data={item} />}
        />
        : null}
    </MessagesContainer>
  );
};

Messages.propTypes = {
  chat: PropTypes.object
};

export default Messages;