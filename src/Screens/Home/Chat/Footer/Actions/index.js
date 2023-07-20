import React, { useState, useContext, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import PropTypes from "prop-types";

import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import { 
  ActionsContainer,
  ActionsButton,
} from '../../../../components';

import Search from './Search';
import Tools from './Tools';

const Actions = ({id}) => {
  const {theme} = useContext(ThemeContext);
  const {chats} = useContext(FirebaseContext);
  const [friend, seFriend] = useState([]);
  const [chat, setChat] = useState([]);
  const [vTools, setVTools] = useState(false);
  const [vSearch, setVSearch] = useState(false);

  const handleSpeech = async () => {
    alert("Fale alguma coisa!");
  };
  const handleAttacch = async () => {
    alert("Escolha um ficheiro!");
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
      seFriend(currentChat?.friendData);
      setChat(currentChat);
    }
  }, [chats, id]);

  if (id) {
    return (
      vSearch ?
        <ActionsContainer theme={theme}>  
          <Search chat={chat} />
          <ActionsButton onPress={handleSearch}>
            <Ionicons name="md-close" size={36} color={theme.textDark} />
          </ActionsButton>
        </ActionsContainer>
        :
        <ActionsContainer theme={theme}>  
          <ActionsButton onPress={handleSpeech}>
            <Ionicons name="mic-outline" size={36} color={theme.textDark} />
          </ActionsButton>
          <ActionsButton onPress={handleAttacch}>
            <Entypo name="attachment" size={30} color={theme.textDark} />
          </ActionsButton>
          <ActionsButton onPress={handleSearch}>
            <Ionicons name="search-outline" size={30} color={theme.textDark} />
          </ActionsButton>
          {vTools?<Tools />:null}
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