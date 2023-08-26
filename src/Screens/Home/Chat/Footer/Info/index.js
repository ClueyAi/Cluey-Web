import React, { useState, useContext, useEffect } from 'react';
import UserAvatar from "react-native-user-avatar";
import PropTypes from "prop-types";

import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import {
  Button,
  InfoContainer,
  InfoPicture,
  InfoState,
  InfoName,
} from '../../../../components';

const Input = ({id}) => {
  const {theme} = useContext(ThemeContext);
  const {appStatus, appInfo, chats} = useContext(FirebaseContext);
  const [chat, setChat] = useState([]);
  const [friend, seFriend] = useState([]);
  const [isPrivate, setIsprivate] = useState(true);

  const getState = () => {
    if (isPrivate) {
      if (appStatus?.server ) {
        return theme.secondary;
      } 
      if (!appStatus?.server) {
        return theme.error;
      } 
    } else {
      if (friend?.status === 'online') {
        return theme.secondary;
      } else if (friend?.status === 'away') {
        return theme.primary;
      } else if (friend?.status === 'busy') {
        return theme.error;
      } else {
        return theme.textGray;
      }
    }
  };

  const getStateBot = () => {
    if (isPrivate) {
      if (appStatus?.server ) {
        return theme.secondary;
      } 
      if (!appStatus?.server) {
        return theme.error;
      } 
    } else {
      if (friend?.status === 'online') {
        return theme.secondary;
      } else if (friend?.status === 'away') {
        return theme.primary;
      } else if (friend?.status === 'busy') {
        return theme.error;
      } else {
        return theme.textGray;
      }
    }
  };

  useEffect(() => {
    if (chats) {
      const currentChat = chats?.find((chat) => chat.id === id);
      setChat(currentChat);
      seFriend(currentChat?.userData);
      if (currentChat?.type) {
        currentChat?.type === 'private'?setIsprivate(true):setIsprivate(false);
      }
    }
  }, [chats, id]);

  if (chat) {
    return (
      <Button>
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
      </Button>
    );
  }

  if (!chat) {
    return (
      <Button>
        <InfoContainer>
          <InfoPicture>
            <UserAvatar
              size={45}
              style={{ width: 45, height: 45, borderRadius: 100, borderWidth: 2 }}
              name={appInfo?.displayName}
              src={appInfo?.photoURL}
            />
          </InfoPicture>
          <InfoState style={{backgroundColor: getStateBot()}}/>
          <InfoName theme={theme}>{appInfo?.displayName}</InfoName>
        </InfoContainer>
      </Button>
    );
  }
  
  return;
};

Input.propTypes = {
  id: PropTypes.string
};

export default Input;