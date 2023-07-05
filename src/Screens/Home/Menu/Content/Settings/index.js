import React, { useContext, useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Flag from 'react-native-flags';

import { FirebaseContext } from "../../../../../api/firebase";
import { ThemeContext } from "../../../../../components/theme";
import { LocaleContext } from "../../../../../components/locale";
import {
  H1,
  P,
  ButtonEmpyte,
  Footer,
} from "../../../../../components/global";
import {
  AlertBox,
  Language,
  ThemeSwitch,
  NotifySwitch,
  SettingsContainer,
  SettingsContent,
  SettingsScrollView,
  SettingsItem,
  SettingsHeaderTitle,
  SettingsWideButton,
  SettingsDivider,
  SettingsSection,
  SettingsDiv,
  SettingsTitle,
  SettingsText,
} from '../../../../components';

const Settings = ({ handleSelected }) => {
  const {user, toggleNotify, signOut} = useContext(FirebaseContext);
  const {locale} = useContext(LocaleContext);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [lightDark, setLightDark] = useState(false);
  const [notifyState, setNotifyState] = useState(false);
  const [vLogout, setVLogout] = useState(false);
  const [vLanguage, setVLanguage] = useState(false);

  const handleLanguage = () => {
    setVLanguage(!vLanguage);
  };

  const handleLogout = () => {
    const options = {
      message1: locale.alert.logout.message,
      onConfirm: async () => {
        try {
          await signOut();
          window.location.reload();
        } catch (error) {
          alert(error);
        }
        setVLogout(false);
      },
      messageConfirm: locale.alert.yes,
      onCancel: () => {
        setVLogout(false);
      },
      messageCancel: locale.alert.no
    };
    setData(options);
    setVLogout(true);
  };
  
  const toggleSwitchTheme = () => {
    setLightDark((previousState) => !previousState);
    toggleTheme(lightDark);
  };

  const toggleSwitchNotify = async () => {
    setNotifyState((previousState) => !previousState);
    await toggleNotify(!notifyState);
  };

  const handleAccount = () => {
    handleSelected(9);
  };

  useEffect(() => {
    const getNotify = async () => {
      user?.notify ? setNotifyState(true) : setNotifyState(false);
    };
    getNotify();
  }, []);

  return (
    <SettingsContainer>
      {vLogout?<AlertBox data={data} />:null}
      <SettingsContent>
        <SettingsScrollView>
          <SettingsItem theme={theme}>
            <SettingsHeaderTitle theme={theme}>{locale.settings.account.title}</SettingsHeaderTitle>
            <SettingsWideButton theme={theme} onPress={handleAccount}>
              <Ionicons name="person-outline" style={{width: 30}} size={22} color={theme.text} />
              <SettingsSection theme={theme}>
                <SettingsTitle theme={theme}>{user?.displayName}</SettingsTitle>
                <SettingsDiv>
                  <SettingsText theme={theme}>{user?.email}</SettingsText>
                </SettingsDiv>
              </SettingsSection>
            </SettingsWideButton>
            <SettingsDivider theme={theme} />
          </SettingsItem>
          <SettingsItem theme={theme}>
            <SettingsHeaderTitle theme={theme}>{locale.settings.preferences.title}</SettingsHeaderTitle>
            <SettingsWideButton theme={theme} onPress={toggleSwitchNotify}>
              <Ionicons name="notifications-outline" style={{width: 30}} size={22} color={theme.text} />
              <SettingsSection theme={theme}>
                <SettingsTitle theme={theme}>{locale.settings.notify.title}</SettingsTitle>
                <SettingsDiv>
                  <NotifySwitch notifyState={notifyState} toggleSwitchNotify={toggleSwitchNotify} />
                </SettingsDiv>
              </SettingsSection>
            </SettingsWideButton>
            <SettingsDivider theme={theme} />
            <SettingsWideButton theme={theme} onPress={handleLanguage}>
              <Ionicons name="language-outline" style={{width: 30}} size={22} color={theme.text} />
              <SettingsSection theme={theme}>
                <SettingsTitle theme={theme}>{locale.language.button.text}</SettingsTitle>
                <SettingsDiv>
                  <SettingsText theme={theme}>{locale.language.name}</SettingsText>
                  <Flag code={locale.language.iso} style={{marginLeft: 5}} size={16} />
                  {vLanguage?<Language vLanguage={vLanguage} setVLanguage={setVLanguage} />:null}
                </SettingsDiv>
              </SettingsSection>
            </SettingsWideButton>
            <SettingsDivider theme={theme} />
            <SettingsWideButton theme={theme} onPress={toggleSwitchTheme}>
              <Ionicons name="color-palette-outline" style={{width: 30}} size={22} color={theme.text} />
              <SettingsSection theme={theme}>
                <SettingsTitle theme={theme}>{locale.theme.title}</SettingsTitle>
                <SettingsDiv>
                  <ThemeSwitch lightDark={lightDark} toggleSwitchTheme={toggleSwitchTheme} />
                </SettingsDiv>
              </SettingsSection>
            </SettingsWideButton>
            <SettingsDivider theme={theme} />
            <SettingsWideButton theme={theme} onPress={handleLogout}>
              <Ionicons name="log-out-outline" style={{width: 30}} size={22} color={theme.text} />
              <SettingsSection theme={theme}>
                <SettingsTitle theme={theme}>{locale.logout.text}</SettingsTitle>
                <SettingsText theme={theme}>{locale.logout.description}</SettingsText>
              </SettingsSection>
            </SettingsWideButton>
          </SettingsItem>
        </SettingsScrollView>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;
