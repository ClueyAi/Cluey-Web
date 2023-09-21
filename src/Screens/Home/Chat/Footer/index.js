import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '/src/components/theme';
import { FirebaseContext } from '/src/api/firebase';

import { 
  FooterContainer,
  FooterContent,
} from '../../../components';

import Info from './Info';
import Input from './Input';
import Actions from './Actions';

const Footer = ({id, setSend}) => {
  const {theme} = useContext(ThemeContext);
  const {chats} = useContext(FirebaseContext);
  const [chat, setChat] = useState([]);
  
  useEffect(() => {
    if (chats) {
      const currentChat = chats?.find((chat) => chat.id === id);
      setChat(currentChat);
    }
  }, [chats, id]);

  if (chat) {
    return (
      <FooterContainer>
        <FooterContent theme={theme}>
          <Info id={id} />
          <Input id={id} setSend={setSend} />
          <Actions id={id} />
        </FooterContent>
      </FooterContainer>
    );
  }

  return (
    <FooterContainer>
      <FooterContent theme={theme}>
        <Info id={id} />
        <Input id={id} setSend={setSend} />
      </FooterContent>
    </FooterContainer>
  );
};

Footer.propTypes = {
  id: PropTypes.string,
  setSend: PropTypes.func,
};

export default Footer;