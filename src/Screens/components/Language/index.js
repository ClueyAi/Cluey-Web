import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Flag from 'react-native-flags';
import PropTypes from 'prop-types';

import { ThemeContext } from '/src/components/theme';
import { us, pt, es, fr, LocaleContext } from '/src/components/locale';

import {
  LanguageContainer,
  LanguageButton,
  LanguageText
} from '..'

const Language = ({setVLanguage }) => {

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

  return (
    <LanguageContainer theme={theme} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      {options.map((option) => (
        <LanguageButton
          key={option.iso}
          theme={theme}
          style={locale.language.iso === option.iso?{borderColor:theme.primary}:{borderColor:theme.border}}
          onPress={() => handleLanguageChange(option.iso)}
        >
          <Flag code={option.iso} size={32}/>
          <LanguageText theme={theme}>{option.name}</LanguageText>
        </LanguageButton>
      ))}
    </LanguageContainer>
  );
};

Language.propTypes = {
  setVLanguage: PropTypes.func
};

export default Language;