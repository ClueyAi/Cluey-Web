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

const Login = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);

  const {goTo} = navigate();

  const handleSignUp = () => {
    goTo('/auth', {state: {route: 'Register'}});
  };

  return (
    <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{ width: '100%', padding: 20}}>
        <View style={{ marginRight: '4%', marginTop: 10 }}>
          <View style={{flexDirection: "row", width: '100%',  alignItems: 'center', justifyContent: 'flex-end',}}>
            <AuthHeaderP>{locale.signin.button_signup.msg}</AuthHeaderP>
            <LinkButton
              style={{ marginLeft: 2 }}
              onPress={handleSignUp}
            >
              <AuthHeaderLinkText theme={theme}>{locale.signin.button_signup.text}</AuthHeaderLinkText>
            </LinkButton>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <AuthHeaderText style={{ marginBottom: 10 }}>{locale.signin.title}</AuthHeaderText>
          <AuthHeaderP>{locale.signin.description}</AuthHeaderP>
        </View>
        <Form />
        {/*<Provider /> */}  
      </View>
    </View>
  );
};

export default Login;
