import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '/src/components/theme';
import { FirebaseContext } from '/src/api/firebase';

import { HeaderChatContainer } from '../../../components';

import Back from './Back';
import Count from './Count';

const Header = ({id}) => {
  const { theme } = useContext(ThemeContext);
  const { chats } = useContext(FirebaseContext);
  const [visible, setVisible] = useState(false);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const currentChat = chats?.find((chat) => chat.id === id);
    setChat(currentChat)

    if (chat?.type === 'group') {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [chats, chat, id]);

  if (visible && chat) {
    return (
      <HeaderChatContainer theme={theme}>
        <Back id={id} />
        <Count id={id} />
      </HeaderChatContainer>
    );
  }

  if (visible) {
    return (
      <HeaderChatContainer style={{justifyContent: 'flex-end'}} theme={theme}>
        <Count id={id} />
      </HeaderChatContainer>
    );
  }

  return;
};

Header.propTypes = {
  id: PropTypes.string
};

export default Header;