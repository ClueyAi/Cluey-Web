import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { Main } from '../../../../components/styles';
import Mark from '../../../../components/mark';

import Message from './Message';

const Messages = ({talk}) => {
  const message = talk?.messages;

  return (
    <Main>
      <Mark/>
      {message ?
        <FlatList
          data={message.reverse()}
          inverted
          style={{scaleY: -1}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Message data={item}/>
          )}
        />
        :null}
    </Main>
  );
};

Messages.propTypes = {
  talk: PropTypes.object,
};

export default Messages;