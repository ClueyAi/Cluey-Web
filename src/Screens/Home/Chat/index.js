import React, {useContext, useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { FirebaseContext } from '../../../api/firebase';
import { ThemeContext } from '../../../components/theme';

import { ChatContainer } from '../../components';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Chat = () => {
  const location = useLocation();
  const {appStatus} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);
  const [id, setId] = useState(null);

  const status = appStatus?.server;

  useEffect(() => {
    setId(location.state?.id ?? null);
  }, [location]);

  if (!status) {
    return (
      <ChatContainer theme={theme}>
        <Header id={id}/>
        <Content id={id}/>
        <Footer id={id} />
      </ChatContainer>
    );
  }

  return (
    <ChatContainer theme={theme}>
      <Header id={id} />
      <Content id={id} />
      <Footer id={id} />
    </ChatContainer>
  );
};

export default Chat;