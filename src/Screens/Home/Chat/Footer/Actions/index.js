import React, { useState, useContext, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import PropTypes from "prop-types";

import { FirebaseContext } from '/src/api/firebase';
import { LocaleContext } from '../../../../../components/locale';
import { ThemeContext } from '/src/components/theme';
import {
  AlertBox,
  ActionsContainer,
  ActionsButton,
} from '../../../../components';

import Search from './Search';
import Tools from './Tools';

const Actions = ({id}) => {
  const {theme} = useContext(ThemeContext);
  const {locale} = useContext(LocaleContext);
  const {chats} = useContext(FirebaseContext);
  const [chat, setChat] = useState([]);
  const [vTools, setVTools] = useState(false);
  const [vSearch, setVSearch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  const handleSpeech = async () => {
    const options = {
      title: locale.alert.working.title,
      message1: locale.alert.working.message1,
      message2: locale.alert.working.message2,
      name: 'Speech',
      onCancel: () => {
        setVisible(false);
      },
      messageCancel: locale.alert.ok
    };
    setData(options);
    setVisible(true);
  };
  const handleAttacch = async () => {
    const options = {
      title: locale.alert.working.title,
      message1: locale.alert.working.message1,
      message2: locale.alert.working.message2,
      name: 'Attach',
      onCancel: () => {
        setVisible(false);
      },
      messageCancel: locale.alert.ok
    };
    setData(options);
    setVisible(true);
  };
  const handleSearch = async () => {
    setVSearch(!vSearch);
    setVTools(false);
  };
  const handleOptions= async () => {
    setVTools(!vTools);
    setVSearch(false);
  };

  useEffect(() => {
    if (chats) {
      const currentChat = chats?.find((chat) => chat.id === id);
      setChat(currentChat);
    }
  }, [chats, id]);

  if (id) {
    return (
      vSearch ?
        <ActionsContainer theme={theme}>
          {visible?<AlertBox data={data} />:null}
          <Search chat={chat} />
          <ActionsButton onPress={handleSearch}>
            <Ionicons name="md-close" size={36} color={theme.textDark} />
          </ActionsButton>
        </ActionsContainer>
        :
        <ActionsContainer theme={theme}>  
          {visible?<AlertBox data={data} />:null}
          <ActionsButton onPress={handleSpeech}>
            <Ionicons name="mic-outline" size={36} color={theme.textDark} />
          </ActionsButton>
          <ActionsButton onPress={handleAttacch}>
            <Entypo name="attachment" size={30} color={theme.textDark} />
          </ActionsButton>
          <ActionsButton onPress={handleSearch}>
            <Ionicons name="search-outline" size={30} color={theme.textDark} />
          </ActionsButton>
          {vTools?<Tools id={id} />:null}
          <ActionsButton onPress={handleOptions}>
            {vTools?
              <Ionicons name="md-close" size={38} color={theme.textDark} />:
              <Ionicons name="menu-outline" size={38} color={theme.textDark} />}
          </ActionsButton>
        </ActionsContainer>
    );
  }
  
  return;
};

Actions.propTypes = {
  id: PropTypes.string
};

export default Actions;