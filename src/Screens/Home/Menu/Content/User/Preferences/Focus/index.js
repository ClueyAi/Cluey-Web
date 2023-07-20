import React, { useContext, useState, useEffect } from 'react';
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
} from '../../../../../../components';

const Focus = ({ focus, setFocusItens }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  const [otherItems, setOtherItems] = useState([]);
  const [other, setOther] = useState(false);
  const buttons = [
    { id: 1, title: locale.preferences.focus.itens.personal, selected: false },
    { id: 2, title: locale.preferences.focus.itens.commercial, selected: false },
    { id: 3, title: locale.preferences.focus.itens.academic, selected: false },
    { id: 4, title: locale.preferences.focus.itens.other, selected: false },
  ];

  const handleSelect = (button) => {
    const other = locale.preferences.focus.itens.other;
    const newSelectedButtons = { ...selectedButtons };
    if (newSelectedButtons[button]) {
      delete newSelectedButtons[button];
    } else {
      newSelectedButtons[button] = true;
    }
    setSelectedButtons(newSelectedButtons);

    const selectedButtonNames = Object.keys(newSelectedButtons);
    setFocusItens(selectedButtonNames);

    if (selectedButtonNames.includes(other)) {
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
        setOtherItems(itens);
        return [...acc, { [other]: itens }];
      }
      return [...acc, name];
    }, []);
    setFocusItens(focusItens);
  };

  useEffect(() => {
    const updatedButtons = buttons.map((button) => {
      const other = locale.preferences.focus.itens.other;
      const otherFind = focus?.find((item) => typeof item === 'object' && other in item);
      const otherKey = otherFind?Object.keys(otherFind)[0]:'';
      if (focus?.includes(other)) {
        setOther(true);
      } else {
        setOther(false);
      }

      if (otherKey?.includes(button.title)) {
        const otherItens = otherFind[otherKey];
        if (otherItens.length > 0) {
          setOther(true);
          setOtherItems(otherItens.join(','));
        }
        return { ...button, selected: true };
      }

      if (focus?.includes(button.title)) {
        return { ...button, selected: true };
      }
      return button;
    });

    const selectedButtonNames = updatedButtons
      .filter((button) => button.selected)
      .map((button) => button.title);
    
    const selectedButtons = {};
    selectedButtonNames.forEach((name) => {
      selectedButtons[name] = true;
    });
    setSelectedButtons(selectedButtons);
    const selectedFocus = Object.keys(selectedButtons);
    setFocusItens(selectedFocus);
  }, [focus]);

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
              value={otherItems}
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
  focus: PropTypes.array,
  setFocusItens: PropTypes.func,
};

export default Focus;
