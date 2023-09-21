import React, { useState, useContext, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Flag from 'react-native-flags';

import { ThemeContext } from "/src/components/theme";
import { LocaleContext } from "/src/components/locale";
import { FirebaseContext } from "/src/api/firebase";
import CountryPicker  from "/src/api/country-picker";
import {
  UserContainer,
  UserContent,
  UserCountry,
  UserScrollView,
  UserWideButton,
  UserSection,
  UserTitle,
  UserText,
  DirectItemState
} from '../../../../components'

import Status from './Status';
import Profile from './Profile';
import Email from './Email';
import Password from './Password';
import Preferences from './Preferences';

const User = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const { user, putCountry } = useContext(FirebaseContext);
  const [editingName, setEditingName] = useState(false);
  const [status, setStatus] = useState('');
  const [vStatus, setVStatus] = useState(false);
  const [vEmail, setVEmail] = useState(false);
  const [vPassword, setVPassword] = useState(false);
  const [vCountry, setVCountry] = useState(false);
  const [VPreferences, setVPreferences] = useState(false);

  const country = user?.country;

  const getState = () => {
    if (user?.status === 'online') {
      return theme.secondary;
    } else if (user?.status === 'away') {
      return theme.primary;
    } else if (user?.status === 'busy') {
      return theme.error;
    } else {
      return theme.textGray;
    }
  };

  const handleEditName = () => {
    setEditingName(!editingName);
  };

  const handleCountrySelect = (country) => {
    const {cca2, name} = country
    try {
      putCountry(cca2, name.common);
    } catch (error) {
      console.log(error.message);
    }
    setVCountry(false);
  };

  const handleState = () => {
    setVStatus(true);
  };

  const ghostPress = () => {
    setEditingName(false);
  };

  const handleChangeEmail = () => {
    setVEmail(true);
  };
  const handleChangePassword = () => {
    setVPassword(true); 
  };
  const handleCountry = () => {
    setVCountry(!vCountry)
  };
  const openPreferences = () => {
    setVPreferences(true);
  }

  useEffect(() => {
    setStatus(user?.status[0].toUpperCase() + user?.status.substr(1));
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={ghostPress} accessible={false}>
      <UserContainer>
        <UserContent style={{marginTop: 20}}>
          <Profile editingName={editingName} handleEditName={handleEditName} />
          {vEmail?<Email setVEmail={setVEmail} />:
            vPassword?<Password setVPassword={setVPassword} />:
              vCountry?
                <CountryPicker onClose={handleCountry} closeTxt={locale.country_config.buttons.close} onSelect={handleCountrySelect} />:
                vStatus?<Status setVStatus={setVStatus} />:
                  <UserScrollView style={{ marginTop: 30 }} showsVerticalScrollIndicator={false}>
                    <UserWideButton onPress={handleState}>
                      <UserSection>
                        <UserTitle theme={theme}>{locale.status_config.title}</UserTitle>
                        <UserCountry>
                          <DirectItemState style={{backgroundColor: getState(), marginRight: 4, marginTop: 3}}/>
                          <UserText theme={theme}>{status}</UserText>
                        </UserCountry>
                      </UserSection>
                      <Ionicons name="chevron-forward" size={25} color={theme.textGray} />
                    </UserWideButton>
                    <UserWideButton onPress={handleChangeEmail}>
                      <UserSection>
                        <UserTitle theme={theme}>{locale.email_config.title}</UserTitle>
                        <UserText theme={theme}>{user?.email}</UserText>
                      </UserSection>
                      <Ionicons name="chevron-forward" size={25} color={theme.textGray} />
                    </UserWideButton>
                    <UserWideButton onPress={handleChangePassword}>
                      <UserSection>
                        <UserTitle theme={theme}>{locale.password_config.title}</UserTitle>
                        <UserText theme={theme}>{locale.password_config.subtitle}</UserText>
                      </UserSection>
                      <Ionicons name="chevron-forward" size={25} color={theme.textGray} />
                    </UserWideButton>
                    <UserWideButton onPress={handleCountry}>
                      <UserSection>
                        <UserTitle theme={theme}>{locale.country_config.title}</UserTitle>
                        {country?
                          <UserCountry>
                            <Flag code={country?.iso} style={{marginRight: 4}} size={16}/>
                            <UserText theme={theme}>{country?.name}</UserText>
                          </UserCountry>
                          :
                          <UserText theme={theme}>{locale.country_config.description}</UserText>
                        }
                      </UserSection>
                      <Ionicons name="chevron-forward" size={25} color={theme.textGray} />
                    </UserWideButton>
                    <UserWideButton onPress={openPreferences}>
                      <UserSection style={{ alignItems: "flex-start" }}>
                        <UserTitle theme={theme}>{locale.preferences.title}</UserTitle>
                        <UserText theme={theme}>{locale.preferences.description}</UserText>
                      </UserSection>
                      <Ionicons name="chevron-forward" size={25} color={theme.textGray} />
                    </UserWideButton>
                    {VPreferences?<Preferences setVPreferences={setVPreferences} />:null}
                  </UserScrollView>}
        </UserContent>
      </UserContainer>
    </TouchableWithoutFeedback>
  );
};

export default User;
