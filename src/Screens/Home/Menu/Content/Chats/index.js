import React, { useContext, useState, useEffect } from 'react';
import { FlatList  } from 'react-native';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../../api/firebase';
import { shadow, ThemeContext } from '../../../../../components/theme';

import { ChatsContainer, ChatsButton } from '../../../../components';
import { navigate, hover } from '../../../../functions';

import Item from './Item';

const Chats = () => {
  const {chats, editChat, deleteChat} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);
  const [privateChats, setPrivateChats] = useState(null);
  const {goTo} = navigate();

  const handlerEditChatName = async (chatId, newName) => {
    await editChat(chatId, newName);
  };

  const handlerDeleteChat = async (chatId) => {
    await deleteChat(chatId);
  };

  const handlerChat = (item) => {
    goTo('/', {state: {id: item.id}});
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
        <Item item={item} handlerDeleteChat={handlerDeleteChat} handlerEditChatName={handlerEditChatName} editing={editing} setEditing={setEditing} />
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
      <FlatList
        data={privateChats}
        style={{width: '100%', paddingTop: 10}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </ChatsContainer>
  );
};

export default Chats;