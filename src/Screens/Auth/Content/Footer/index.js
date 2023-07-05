import React, {useContext} from "react";
import { LocaleContext } from "../../../../components/locale";
import { ThemeContext } from "../../../../components/theme";

import {
  View,
} from "../../../../components/global";

import {
  LinkButton,
  AuthFooterContainer,
  AuthFooterSection,
  PickerList,
  AuthFooterLinkText
} from '../../../components'
import { navigate } from "../../../functions";

const Footer = () => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const {goTo} = navigate();

  const about = locale.about.title;
  const privacy = locale.global.app.policy_terms.policy.title.split(' ')[2];
  const terms = locale.global.app.policy_terms.terms.title.split(' ')[0];

  const handleRules = () => {
    window.open('https://cluey.webflow.io/termos');
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
