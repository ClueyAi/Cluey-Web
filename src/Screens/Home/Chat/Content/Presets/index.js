import React, { useContext } from 'react';
import { FlatList  } from 'react-native';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../../../../api/firebase';
import { LocaleContext } from '../../../../../components/locale';
import { ThemeContext, shadow } from '../../../../../components/theme';

import { PresetsContainer, SuggestionsButton, SuggestionsText } from '../../../../components';
import { navigate, hover } from '../../../../functions';

import Suggests from './Suggests';

const Presets = () => {
  const {createPrivateChat, createUserPrivateMessage, createAiPrivateMessage} = useContext(FirebaseContext);
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const {goTo} = navigate();

  const suggestionsData = locale.home.suggestions.itens;

  const suggestions = [
    {id: suggestionsData.s1.id, name: suggestionsData.s1.name, prompt: suggestionsData.s1.prompt},
    {id: suggestionsData.s2.id, name: suggestionsData.s2.name, prompt: suggestionsData.s2.prompt},
    {id: suggestionsData.s3.id, name: suggestionsData.s3.name, prompt: suggestionsData.s3.prompt},
    {id: suggestionsData.s4.id, name: suggestionsData.s4.name, prompt: suggestionsData.s4.prompt},
    {id: suggestionsData.s5.id, name: suggestionsData.s5.name, prompt: suggestionsData.s5.prompt},
  ];

  const handlerSuggests = async (item) => {
    const textValue = item.prompt;
    if (textValue.text !== "") {
      try {
        let chatId = null;
        await createPrivateChat(textValue).then((item) => {
          chatId = item;
          goTo('/', {state: {id: item}});
        });
        if (chatId) {
          await createUserPrivateMessage(chatId, textValue);
          await createAiPrivateMessage(chatId, textValue);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const RenderItem = ({ item }) => {
    const { isHovered, handleMouseEnter, handleMouseLeave } = hover();

    return (
      <SuggestionsButton
        style={isHovered? null: shadow}
        onPress={() => handlerSuggests(item)}
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Suggests item={item} />
      </SuggestionsButton>
    );
  };

  RenderItem.propTypes = {
    item: PropTypes.object
  };

  return (
    <PresetsContainer>
      <SuggestionsText>{locale.home.suggestions.title}</SuggestionsText>
      <FlatList
        data={suggestions}
        style={{width: '100%', paddingTop: 10}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} />}
      />
    </PresetsContainer>
  );
};

export default Presets;