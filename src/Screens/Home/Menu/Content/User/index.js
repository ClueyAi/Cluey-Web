import React, { useState, useContext } from "react";
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
} from '../../../../components'

import Profile from './Profile';
import Email from './Email';
import Password from './Password';
import Preferences from './Preferences';

const User = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const { user, putCountry } = useContext(FirebaseContext);
  const [editingName, setEditingName] = useState(false);
  const [vEmail, setVEmail] = useState(false);
  const [vPassword, setVPassword] = useState(false);
  const [vCountry, setVCountry] = useState(false);
  const [VPreferences, setVPreferences] = useState(false);

  const country = user?.country;

  const handleEditName = () => {
    setEditingName(!editingName);
  };

  const handleCountrySelect = (country) => {
    const {cca2, name} = country
    try {
      putCountry(cca2, name.common);
    } catch (error) {
      alert(error.message);
    }
    setVCountry(false);
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

  return (
    <TouchableWithoutFeedback onPress={ghostPress} accessible={false}>
      <UserContainer>
        <UserContent style={{marginTop: 20}}>
          <Profile editingName={editingName} handleEditName={handleEditName} />
          {vEmail?<Email />:
            vPassword?<Password />:
              vCountry?<CountryPicker onSelect={handleCountrySelect} />:
                <UserScrollView style={{ marginTop: 30 }}>
                  <UserWideButton onPress={handleChangeEmail}>
                    <UserSection>
                      <UserTitle theme={theme}>{locale.email_config.title}</UserTitle>
                      <UserText theme={theme}>{user?.email}</UserText>
                    </UserSection>
                    <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
                  </UserWideButton>
                  <UserWideButton onPress={handleChangePassword}>
                    <UserSection>
                      <UserTitle theme={theme}>{locale.password_config.title}</UserTitle>
                    </UserSection>
                    <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
                  </UserWideButton>
                  <UserWideButton onPress={handleCountry}>
                    <UserSection>
                      <UserTitle theme={theme}>{locale.country_config.title}</UserTitle>
                      {country?
                        <UserCountry>
                          <Flag code={country?.iso} style={{marginHorizontal: 5}} size={16}/>
                          <UserText theme={theme}>{country?.name}</UserText>
                        </UserCountry>
                        :
                        <UserText theme={theme}>{locale.country_config.description}</UserText>
                      }
                    </UserSection>
                    <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
                  </UserWideButton>
                  <UserWideButton onPress={openPreferences}>
                    <UserSection style={{ alignItems: "flex-start" }}>
                      <UserTitle theme={theme}>{locale.preferences.title}</UserTitle>
                      <UserText theme={theme}>{locale.preferences.description}</UserText>
                    </UserSection>
                    <Ionicons name="chevron-forward" size={30} color={theme.textGray} />
                  </UserWideButton>
                  {VPreferences?<Preferences setVPreferences={setVPreferences} />:null}
                  {/*<UserWideButton onPress={handleLink}>
                    <Provider>
                      <WideButton style={{marginVertical: 2}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Ionicons name="logo-google" size={26} color={theme.textGray} />
                          <H3 style={{marginLeft: 30}}>Google</H3>
                        </View>
                        <H3 style={{marginRight: 10}}>Link</H3>
                      </WideButton>
                      <WideButton style={{marginVertical: 2}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Ionicons name="logo-apple" size={28} color={theme.textGray} />
                          <H3 style={{marginLeft: 30}}>Apple</H3>
                        </View>
                        <H3 style={{marginRight: 10}}>Link</H3>
                      </WideButton>
                    </Provider>
                  */}
                </UserScrollView>}
        </UserContent>
      </UserContainer>
    </TouchableWithoutFeedback>
  );
};

export default User;
