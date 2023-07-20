import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '/src/components/theme';
import { FirebaseContext } from '/src/api/firebase';

import { HeaderChatContainer } from '../../../components';

import Count from './Count';

const Header = ({id}) => {
  const { theme } = useContext(ThemeContext);
  const { chats } = useContext(FirebaseContext);
  const [visible, setVisible] = useState(false);
  const [chat, setChat] = useState(null);

  useEffect(() => {
    const currentChat = chats?.find((chat) => chat.id === id);
    setChat(currentChat)

    if (chat?.type === 'private') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [chats, chat, id]);

  if (visible) {
    return (
      <HeaderChatContainer theme={theme}>
        <Count id={id} />
        <Count id={id} />
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