import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { Main } from '../../../../components/styles';
import Mark from '../../../../components/mark';

import Message from './Message';

const Messages = ({id, chats}) => {
  const chat = chats?.find(chat => chat.id === id);

  const reversedMessages = chat.messages ? [...chat.messages].reverse() : [];

  return (
    <Main>
      <Mark/>
      {chat ? 
        <FlatList
          data={reversedMessages}
          inverted
          style={{ transform: [{ scaleY: -1 }] }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Message data={item} />}
        />
        : null}
    </Main>
  );
};

Messages.propTypes = {
  id: PropTypes.string,
  chats: PropTypes.array,
  messages: PropTypes.array
};

export default Messages;