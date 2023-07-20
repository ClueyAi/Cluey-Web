import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LocaleContext } from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';

import { 
  ActionSearchContainer,
  ActionSearchSearchBox,
} from '../../../../../components';

const Search = ({ chat }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [textValue, setTextValue] = useState('');

  const searchMessages = () => {
    const messages = chat?.messages || [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      if (message.text.includes(textValue)) {
        console.log('Mensagem encontrada:', message);
        break;
      }
    }
  };

  useEffect(() => {
    searchMessages();
  }, [textValue]);

  const handleSearchChange = (text) => {
    setTextValue(text);
  };

  return (
    <ActionSearchContainer theme={theme}>
      <ActionSearchSearchBox
        placeholder={locale.home.chat_box.placeholder}
        theme={theme}
        value={textValue}
        placeholderTextColor={theme.textDark}
        selectionColor={theme.primary}
        blurOnSubmit={false}
        autoFocus
        onChangeText={handleSearchChange}
      />
    </ActionSearchContainer>
  );
};

Search.propTypes = {
  chat: PropTypes.object.isRequired
};

export default Search;
