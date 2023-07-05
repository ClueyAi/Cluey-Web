import React, { useState, useContext, useEffect } from 'react';
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

import { FirebaseContext } from '../../../../../api/firebase';
import { ThemeContext } from '../../../../../components/theme';
import { 
  InfoContainer,
  InfoPicture,
  InfoState,
  InfoName,
} from '../../../../components';

const Input = ({id}) => {
  const {theme} = useContext(ThemeContext);
  const {appStatus, chats} = useContext(FirebaseContext);
  const [chat, setChat] = useState([]);
  const [friend, seFriend] = useState([]);
  const [isPrivate, setIsprivate] = useState(false);

  const getState = () => {
    if (isPrivate) {
      if (appStatus?.server ) {
        return theme.secondary;
      } 
      if (!appStatus?.server) {
        return theme.error;
      } 
    } else {
      if (chat?.status === 'online') {
        return theme.secondary;
      } else if (chat?.status === 'away') {
        return theme.primary;
      } else if (chat?.status === 'busy') {
        return theme.error;
      } else {
        return theme.textDark;
      }
    }
  };

  useEffect(() => {
    if (chats) {
      const currentChat = chats?.find((chat) => chat.id === id);
      setChat(currentChat);
      seFriend(currentChat?.userData);
      currentChat?.type === 'private'?setIsprivate(true):setIsprivate(false);
    }
  }, [chats, id]);

  if (id) {
    return (
      <InfoContainer>
        <InfoPicture>
          <UserAvatar
            size={45}
            style={{ width: 45, height: 45, borderRadius: 100, borderWidth: 2 }}
            name={friend?.displayName}
            src={friend?.photoURL}
          />
        </InfoPicture>
        <InfoState style={{backgroundColor: getState()}}/>
        <InfoName theme={theme}>{friend?.displayName}</InfoName>
      </InfoContainer>
    );
  }
  
  return;
};

Input.propTypes = {
  id: PropTypes.string
};

export default Input;