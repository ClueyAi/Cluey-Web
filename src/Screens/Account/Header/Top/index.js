import React, { useContext } from 'react';
import { Image } from 'react-native';
import UserAvatar from "react-native-user-avatar";

import { LocaleContext} from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';

import {
  AccountTop,
  AccountTopSection,
  AccountTopButton,
  AccountTopTitle,
  AccountTopText,
  AccountTopSectionButton,
  AccountTopProfile,
} from '../../../components';
import { navigate } from "../../../functions";

const Header = () => {
  const {locale} = useContext(LocaleContext);
  const {user} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);

  const {goHome} = navigate();

  const handleCommunity = () => {
    window.location.reload();
  };
  const handleBlog = () => {
    window.location.reload();
  };
  const handleInvite = () => {
    window.location.reload();
  };
  const handleHelp = () => {
    window.open('https://cluey.webflow.io/#Ajuda-Cluey', '_blank');
  };

  return (
    <AccountTop theme={theme}>
      <AccountTopButton onPress={goHome}>
        <Image style={{width: 55, height: 55, marginBottom: -4}} source={require('/assets/images/icon.png')} />
        <AccountTopTitle theme={theme}>{locale.global.app.name}!</AccountTopTitle>
      </AccountTopButton>
      <AccountTopSection>
        <AccountTopSectionButton onPress={handleCommunity}>
          <AccountTopText theme={theme}>{locale.account.header.community}</AccountTopText>
        </AccountTopSectionButton>
        <AccountTopSectionButton onPress={handleBlog}>
          <AccountTopText theme={theme}>{locale.account.header.blog}</AccountTopText>
        </AccountTopSectionButton>
        <AccountTopSectionButton onPress={handleInvite}>
          <AccountTopText theme={theme}>{locale.account.header.invite}</AccountTopText>
        </AccountTopSectionButton>
        <AccountTopSectionButton onPress={handleHelp}>
          <AccountTopText theme={theme}>{locale.account.header.help}</AccountTopText>
        </AccountTopSectionButton>
      </AccountTopSection>
      <AccountTopProfile>
        <AccountTopText theme={theme}>{user?.userName}</AccountTopText>
        <UserAvatar
          size={42}
          style={{ width: 42, height: 42, borderRadius: 100, marginLeft: 10 }}
          name={user?.displayName}
          src={user?.photoURL}
        />
      </AccountTopProfile>
    </AccountTop>
  );
};

export default Header;