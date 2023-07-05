import React, { useState, useContext } from 'react';
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
} from '../../../../components/global';

const New = ({talkId, friendEmail}) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {createUserWhisp} = useContext(FirebaseContext);
  const [textValue, setTextValue] = useState('');

  const requestValidation = async (text) => {
    setTextValue(text);
  };

  const handleSend = async () => { 
    setTextValue('');
    if (textValue.text !== "") {
      try {
        await createUserWhisp(talkId, friendEmail, textValue);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSpeech = async () => {
    alert("Fale!");
  };

  return (
    <ChatBox style={Platform.OS === "ios" ? {paddingBottom: '8%'} : {paddingBottom: '5%'}}>
      <ChatInput style={{...shadow, flex: 1}}>
        <ChatTextInput
          style={{fontSize: 15}}
          value={textValue}
          multiline={true}
          minHeight={50}
          placeholder={locale.home.chat_box.placeholder}
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
  talkId: PropTypes.string.isRequired,
  friendEmail: PropTypes.string.isRequired,
};

export default New;