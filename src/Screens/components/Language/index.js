import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flag from 'react-native-flags';
import PropTypes from 'prop-types';

import { ThemeContext, shadow } from '/src/components/theme';
import { us, pt, es, fr, LocaleContext } from '/src/components/locale';

import {
  LanguageContainer,
  LanguageButton
} from '..'
import { hover } from '../../functions';

const Language = ({ vLanguage, setVLanguage }) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = hover();

  const {locale, changeLocale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const handleVisible = () => {
    setVLanguage(false);
  }
  const handleLanguageChange = (iso) => {
    AsyncStorage.setItem('iso', iso);
    changeLocale(iso);
    handleVisible();
  };

  const options = [
    { iso: us.language.iso, name: us.language.name },
    { iso: pt.language.iso, name: pt.language.name},
    { iso: es.language.iso, name: es.language.name},
    { iso: fr.language.iso, name: fr.language.name},
  ];

  const optionsLeft = options.slice(0, 2);
  const optionsRight = options.slice(2);

  return (
    <LanguageContainer theme={theme} style={shadow}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          {optionsLeft.map((option) => (
            <LanguageButton
              key={option.iso}
              theme={theme}
              style={locale.language.iso === option.iso?{borderColor:theme.primary}:{borderColor:theme.border}}
              onPress={() => handleLanguageChange(option.iso)}
            >
              <Flag code={option.iso} size={32}/>
              <Text>{option.name}</Text>
            </LanguageButton>
          ))}
        </View>
        <View style={{flex: 1}}>
          {optionsRight.map((option) => (
            <LanguageButton
              key={option.iso}
              theme={theme}
              style={locale.language.iso === option.iso?{backgroundColor:theme.primary}:{backgroundColor:theme.background}}
              onPress={() => handleLanguageChange(option.iso)}
            >
              <Flag code={option.iso} size={32}/>
              <Text>{option.name}</Text>
            </LanguageButton>
          ))}
        </View>
      </View>
    </LanguageContainer>
  );
};

Language.propTypes = {
  vLanguage: PropTypes.bool,
  setVLanguage: PropTypes.func
};

export default Language;