import React, { useState, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";

import { FirebaseContext } from '../../../../../api/firebase';
import { ThemeContext } from '../../../../../components/theme';
import { LocaleContext } from '../../../../../components/locale';
import {
  AlertBox,
  InputContainer,
  InputTextBox,
  InputButton,
} from '../../../../components';

const Input = ({id}) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const { appStatus, chats, createUserPrivateMessage, createAiPrivateMessage, createUserDirectMessage} = useContext(FirebaseContext);
  const [textValue, setTextValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  const server = appStatus?.server;

  const requestValidation = async (text) => {
    setTextValue(text);
  };

  const handleSend = async () => { 
    setTextValue('');
    const options = {
      message1: locale.alert.server.offline_text,
      onCancel: () => {
        setVisible(false);
      },
      messageCancel: locale.alert.ok,
    };
    if (textValue.text !== "") {
      chats.forEach(async(item) => {
        if (item.type === 'private' && item.id === id) {
          if (server) {
            try {
              await createUserPrivateMessage(id, textValue);
              await createAiPrivateMessage(id, textValue);
            } catch (error) {
              console.error(error);
            }
          } else {
            setData(options);
            setVisible(true);
          }
        }
        if (item.type === 'direct' && item.id === id) {
          const friend = item.userData;
          try {
            await createUserDirectMessage(id, friend, textValue);
          } catch (error) {
            console.error(error);
          }
        }
      });
    }
  };

  if (id) {
    return (
      <InputContainer>
        {visible?<AlertBox data={data} />:null}
        <InputTextBox
          placeholder={locale.home.chat_box.placeholder}
          theme={theme}
          value={textValue}
          placeholderTextColor={theme.textDark}
          selectionColor={theme.primary}
          blurOnSubmit={false}
          onChangeText={requestValidation}
          onSubmitEditing={handleSend}
        />
        {textValue === "" || textValue == null ?
          <Ionicons style={{marginHorizontal: 20}} name="send-outline" size={28} color={theme.transparent} />
          :
          <InputButton onPress={handleSend} accessibilityLabel={locale.home.send_button.accessibility}>
            <Ionicons name="send-outline" size={28} color={theme.primary} />
          </InputButton>
        }
      </InputContainer>
    );
  }
  
  return;
};

Input.propTypes = {
  id: PropTypes.string
};

export default Input;