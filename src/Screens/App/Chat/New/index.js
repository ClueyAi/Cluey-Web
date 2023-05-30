import React, { useState, useContext, useEffect } from 'react';
import { Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import PropTypes from "prop-types";

import { FirebaseContext } from '../../../../api/firebase';
import { ThemeContext, shadow } from '../../../../components/theme';
import { LocaleContext } from '../../../../components/locale';
import { 
  ChatTextInput,
  ChatBox,
  Button,
  ChatInput,
} from '../../../../components/styles';

const New = ({chatId}) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {user, createUserMessage, createAiMessage} = useContext(FirebaseContext);
  const [name, setName] = useState('');
  const [textValue, setTextValue] = useState('');

  const profile = user?.profile;

  const requestValidation = async (text) => {
    setTextValue(text);
  };

  const handleSend = async () => { 
    setTextValue('');
    if (textValue.text !== "") {
      try {
        await createUserMessage(chatId, textValue);
        await createAiMessage(chatId, textValue);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSpeech = async () => {
    alert("Fale!");

  };

  useEffect(() => {
    if (profile) {
      const email = profile?.email.split("@")[0];
      const nameFull = profile?.displayName? profile?.displayName : email;
      setName(nameFull.split(" ")[0]);
    }
  }, [profile]);
  return (
    <ChatBox style={Platform.OS === "ios" ? {paddingBottom: '8%'} : {paddingBottom: '5%'}}>
      <ChatInput style={{...shadow, flex: 1}}>
        <ChatTextInput
          style={{fontSize: 15}}
          placeholder={locale.home.chat_box.placeholder1+name+locale.home.chat_box.placeholder2}
          value={textValue}
          multiline={true}
          minHeight={50}
          placeholderTextColor={theme.primary}
          selectionColor={theme.primary}
          blurOnSubmit={false}
          onChangeText={requestValidation}
        />
        {textValue === "" || textValue == null ?
          <Button style={{paddingRight: 15}} onPress={handleSpeech} accessibilityLabel={locale.home.send_button.accessibility}>
            <Ionicons name="mic" size={28} color={theme.primary} />
          </Button>
          :
          <Button style={{paddingRight: 15}} onPress={handleSend} accessibilityLabel={locale.home.send_button.accessibility}>
            <Ionicons name="send" size={24} color={theme.primary} />
          </Button>
        }
      </ChatInput>
    </ChatBox>
  );
};

New.propTypes = {
  chatId: PropTypes.string.isRequired
};

export default New;