import React, { useContext } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';

import { LocaleContext} from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';

import {
  AccountFooter,
  AccountFooterButton,
  AccountFooterSection,
  AccountFooterText,
} from '../../components'

const Footer = () => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const handleHelp = async () => {
    window.open('https://cluey.webflow.io/#Ajuda-Cluey', '_blank');
  };

  return (
    <AccountFooter theme={theme}>
      <AccountFooterButton theme={theme} onPress={handleHelp}>
        <AccountFooterSection theme={theme}>
          <AntDesign name="question" size={24} color={theme.background} />
        </AccountFooterSection>
        <AccountFooterText theme={theme}>{locale.account.header.help}</AccountFooterText>
      </AccountFooterButton>
    </AccountFooter>
  );
};

export default Footer;