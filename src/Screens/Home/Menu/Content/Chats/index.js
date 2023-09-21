import React, { useContext, useState, useEffect } from 'react';
import { FlatList  } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { LocaleContext } from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';
import { shadow, ThemeContext } from '/src/components/theme';

import { ChatsContainer, ChatsButton, ChatsButtonAdd, AddContainer, AddText } from '../../../../components';
import { navigate, hover } from '../../../../functions';

import Item from './Item';

const Chats = () => {
  const {locale} = useContext(LocaleContext);
  const {chats, editChat, archivedChat} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);
  const [privateChats, setPrivateChats] = useState(null);
  const {goTo} = navigate();

  const handlerEditChatName = async (chatId, newName) => {
    await editChat(chatId, newName);
  };

  const handlerArchivedChat = async (chatId) => {
    await archivedChat(chatId);
  };

  const handlerChat = (item) => {
    goTo('/', {state: {id: item.id}});
  };

  const handlerAddChat = () => {
    goTo('/', {state: {id: null}});
  };
  
  const RenderItem = ({ item }) => {
    const { isHovered, handleMouseEnter, handleMouseLeave } = hover();

    return (
      <ChatsButton
        style={isHovered? shadow: null}
        onPress={() => editing? null: handlerChat(item)}
        theme={theme}
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Item item={item} handlerDeleteChat={handlerArchivedChat} handlerEditChatName={handlerEditChatName} editing={editing} setEditing={setEditing} />
      </ChatsButton>
    )
  }

  RenderItem.propTypes = {
    item: PropTypes.object.isRequired,
  };

  useEffect(() => {
    const filteredChats = chats?.filter(chat => chat.type === 'private');
    setPrivateChats(filteredChats);
  }, [chats]);

  return (
    <ChatsContainer>
      <AddContainer>
        <AddText theme={theme}>{locale.directs.item.title}</AddText>
        <ChatsButtonAdd onPress={handlerAddChat}>
          <MaterialIcons name="add" size={24} color={theme.text} />
        </ChatsButtonAdd>
      </AddContainer>
      <FlatList
        data={privateChats}
        style={{width: '100%'}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </ChatsContainer>
  );
};

export default Chats;