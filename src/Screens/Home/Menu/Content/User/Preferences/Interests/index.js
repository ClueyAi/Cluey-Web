import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import { LocaleContext } from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';

import {
  InterestsContainer,
  InterestsAction,
  InterestsButton,
  InterestsButtonText,
} from '../../../../../../components';

const Interests = ({ interests, setInterestsItens }) => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [selectedButtons, setSelectedButtons] = useState({});
  
  const buttons = [
    { id: 1, title: locale.preferences.interests.itens.html, color: '#3ABF38', selected: false },
    { id: 2, title: locale.preferences.interests.itens.ai, color: '#FFBF00', selected: false },
    { id: 3, title: locale.preferences.interests.itens.graphic_design, color: '#56CCF2', selected: false },
    { id: 4, title: locale.preferences.interests.itens.musical_production, color: '#F2994A', selected: false },
    { id: 5, title: locale.preferences.interests.itens.c_sharp, color: '#1455FF', selected: false },
    { id: 6, title: locale.preferences.interests.itens.r, color: '#BB6BD9', selected: false },
    { id: 7, title: locale.preferences.interests.itens.web_design, color: '#56CCF2', selected: false },
    { id: 8, title: locale.preferences.interests.itens.java, color: '#F2994A', selected: false },
    { id: 9, title: locale.preferences.interests.itens.python, color: '#3ABF38', selected: false },
    { id: 10, title: locale.preferences.interests.itens.javascript, color: '#1455FF' ,selected: false },
    { id: 11, title: locale.preferences.interests.itens.ui, color: '#FFBF00', selected: false },
    { id: 12, title: locale.preferences.interests.itens.ux, color: '#56CCF2', selected: false },
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
    setInterestsItens(selectedButtonNames);
  };

  useEffect(() => {
    const updatedButtons = buttons.map((button) => {
      if (interests?.includes(button.title)) {
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
    setInterestsItens(selectedFocus);
  }, [interests]);

  const renderItem = ({ item }) => (
    <InterestsAction>
      <InterestsButton
        style={[
          {
            backgroundColor: item.color,
            borderColor: selectedButtons[item.title] ? theme.text : item.color,
            opacity: selectedButtons[item.title] ? 0.5 : 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
          },
        ]}
        onPress={() => handleSelect(item.title)}
      >
        <InterestsButtonText theme={theme}>{item.title}</InterestsButtonText>
      </InterestsButton>
    </InterestsAction>
  );

  return (
    <InterestsContainer>
      <FlatList
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
      />
    </InterestsContainer>
  );
};

Interests.propTypes = {
  interests: PropTypes.array,
  setInterestsItens: PropTypes.func,
};

export default Interests ;
