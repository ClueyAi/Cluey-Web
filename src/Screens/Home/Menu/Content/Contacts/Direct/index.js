import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { shadow, ThemeContext } from '/src/components/theme';
import { FirebaseContext } from '/src/api/firebase';

import { DirectButton } from '../../../../../components';
import { navigate, hover } from '../../../../../functions';

import Item from './Item';

const Direct = () => {
  const {theme} = useContext(ThemeContext);
  const {user, chats, createDirectUserChat, createDirectFriendChat } = useContext(FirebaseContext);
  const [directChats, setDirectChats] = useState(null);


  const {goTo} = navigate();
  
  const handlerChat = async (item) => {
    try {
      await createDirectUserChat(item?.uid).then(async (chatId) => {
        await createDirectFriendChat(item?.uid, chatId);
        if (chatId != null) {
          goTo('/', {state: {id: chatId}});
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const RenderItem = ({ item }) => {
    const { isHovered, handleMouseEnter, handleMouseLeave } = hover();

    return (
      <DirectButton 
        style={isHovered? shadow: null}
        onPress={() => handlerChat(item.userData)}
        theme={theme}
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Item item={item} user={user} />
      </DirectButton>
    );
  };

  RenderItem.propTypes = {
    item: PropTypes.object,
  };

  useEffect(() => {
    const filteredChats = chats?.filter(chat => chat.type === 'direct');
    setDirectChats(filteredChats);
  }, [chats]);

  return (
    <FlatList
      data={directChats}
      style={{width: '100%'}}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <RenderItem item={item} />}
    />
  );
};

export default Direct;