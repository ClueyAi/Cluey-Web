import React, { useContext } from "react";

import { LocaleContext } from "/src/components/locale";
import { ThemeContext } from "/src/components/theme";

import {
  View,
  LinkButton,
  AuthHeaderLinkText,
  AuthHeaderText,
  AuthHeaderP
} from '../../../components';
import { navigate } from '../../../functions';

import Form from './Form';
// eslint-disable-next-line no-unused-vars
import Provider from './Provider';

const Register = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const {goTo} = navigate();

  const handleSignIn = () => {
    goTo('/auth', {state: {route: 'Login'}});
  };

  return (
    <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{ width: '100%', padding: 20}}>
        <View style={{ marginRight: '4%', marginTop: 10 }}>
          <View style={{flexDirection: "row", width: '100%',  alignItems: 'center', justifyContent: 'flex-end',}}>
            <AuthHeaderP theme={theme}>{locale.signup.button_signin.msg}</AuthHeaderP>
            <LinkButton
              style={{ marginLeft: 2 }}
              onPress={handleSignIn}
            >
              <AuthHeaderLinkText theme={theme}>{locale.signup.button_signin.text}</AuthHeaderLinkText>
            </LinkButton>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <AuthHeaderText theme={theme} style={{ marginBottom: 10 }}>{locale.signup.title}</AuthHeaderText>
          <AuthHeaderP theme={theme}>{locale.signup.description}</AuthHeaderP>
        </View>
        <Form />
        {/*<Provider /> */}
      </View>
    </View>
  );
};

export default Register;
