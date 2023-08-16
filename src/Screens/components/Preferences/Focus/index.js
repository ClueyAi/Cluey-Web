import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { LocaleContext } from '/src/components/locale';
import { ThemeContext, shadow } from '/src/components/theme';

import {
  FocusContainer,
  FocusAction,
  FocusButton,
  FocusButtonText,
  FocusOtherSection,
  FocusOtherDescription,
  FocusOtherInput,
  FocusOtherTextBox
} from '../..';

const Focus = ({ setFocusItens }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  const [other, setOther] = useState(false);
  const buttons = [
    { id: 1, title: locale.preferences.focus.itens.personal, selected: false },
    { id: 2, title: locale.preferences.focus.itens.commercial, selected: false },
    { id: 3, title: locale.preferences.focus.itens.academic, selected: false },
    { id: 4, title: locale.preferences.focus.itens.other, selected: false },
  ];

  const handleSelect = (button) => {
    const newSelectedButtons = { ...selectedButtons };
    if (newSelectedButtons[button]) {
      delete newSelectedButtons[button];
    } else {
      newSelectedButtons[button] = true;
    }
    setSelectedButtons(newSelectedButtons);

    const selectedButtonNames = Object.keys(newSelectedButtons);
    setFocusItens(selectedButtonNames);

    if (selectedButtonNames.includes(locale.preferences.focus.itens.other)) {
      setOther(true);
    } else {
      setOther(false);
    }
  };

  const handleOther = (text) => {
    const itens = text.split(',').map((item) => item.trim());
    const other = locale.preferences.focus.itens.other;
    const selectedButtonNames = Object.keys(selectedButtons);
    const focusItens = selectedButtonNames.reduce((acc, name) => {
      if (name === other) {
        return [...acc, { [other]: itens }];
      }
      return [...acc, name];
    }, []);
    setFocusItens(focusItens);
  };

  const renderItem = ({ item }) => (
    <FocusAction>
      <FocusButton
        style={[
          {
            backgroundColor: theme.primary,
            borderColor: selectedButtons[item.title] ? theme.text : theme.primary,
            opacity: selectedButtons[item.title] ? 0.5 : 1,
          },
        ]}
        onPress={() => handleSelect(item.title)}
      >
        <FocusButtonText theme={theme}>{item.title}</FocusButtonText>
      </FocusButton>
    </FocusAction>
  );

  return (
    <FocusContainer>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      {other?
        <FocusOtherSection>
          <FocusOtherDescription theme={theme}>{locale.preferences.focus.other_input.description}</FocusOtherDescription>
          <FocusOtherInput theme={theme} style={shadow}>
            <FocusOtherTextBox
              theme={theme}
              placeholder={locale.preferences.focus.other_input.placeholder}
              placeholderTextColor={theme.primary47}
              onChangeText={(text) => handleOther(text)}
            />
          </FocusOtherInput>
        </FocusOtherSection>
        :null}
    </FocusContainer>
  );
};

Focus.propTypes = {
  setFocusItens: PropTypes.func.isRequired,
};

export default Focus;
