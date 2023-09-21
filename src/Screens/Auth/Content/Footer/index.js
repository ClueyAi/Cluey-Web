import React, {useContext} from "react";
import { LocaleContext } from "/src/components/locale";
import { ThemeContext } from "/src/components/theme";

import {
  ThemeSwitch,
  View,
  LinkButton,
  AuthFooterContainer,
  AuthFooterSection,
  PickerList,
  AuthFooterLinkText,
} from '../../../components'
import { navigate } from "../../../functions";

const Footer = () => {
  const {locale} = useContext(LocaleContext);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {goTo} = navigate();

  const about = locale.about.title;
  const privacy = locale.global.app.policy_terms.policy.title.split(' ')[2];
  const terms = locale.global.app.policy_terms.terms.title.split(' ')[0];

  const toggleSwitchTheme = (value) => {
    toggleTheme(value);
  };

  const handleRules = () => {
    window.open('https://cluey.pt/termos.html', '_blank');
  };

  const handleAbout = () => {
    goTo('/about');
  };

  return (
    <AuthFooterContainer>
      <View>
        <PickerList />
      </View>
      <AuthFooterSection>
        <ThemeSwitch themeState={!theme} circleSize={22} barHeight={15} toggleSwitchTheme={toggleSwitchTheme} />
        <LinkButton onPress={handleAbout}>
          <AuthFooterLinkText theme={theme}>{about}</AuthFooterLinkText>
        </LinkButton>
        <LinkButton onPress={handleRules}>
          <AuthFooterLinkText theme={theme}>{privacy}</AuthFooterLinkText>
        </LinkButton>
        <LinkButton onPress={handleRules}>
          <AuthFooterLinkText theme={theme}>{terms}</AuthFooterLinkText>
        </LinkButton>
      </AuthFooterSection>
    </AuthFooterContainer>
  );
};

export default Footer;
