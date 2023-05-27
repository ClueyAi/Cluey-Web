import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { Main } from '../../../../components/styles';
import Mark from '../../../../components/mark';

import Message from './Message';

const Messages = ({messages}) => {
  const reversedMessages = messages ? [...messages].reverse() : [];

  return (
    <Main>
      <Mark/>
      {reversedMessages.length > 0 ? (
        <FlatList
          data={reversedMessages}
          inverted
          style={{ transform: [{ scaleY: -1 }] }}
          keyExtractor={(item, index) => `${index}-${messages.length}`}
          renderItem={({ item }) => <Message data={item} />}
        />
      ) : null}
    </Main>
  );
};

Messages.propTypes = {
  chat: PropTypes.object,
  messages: PropTypes.array
};

export default Messages;