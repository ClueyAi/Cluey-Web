import React, { useContext } from "react";

import { LocaleContext } from "/src/components/locale";
import { ThemeContext } from "/src/components/theme";
import {
  View,
  H0, P,
  ButtonEmpyte,
} from "/src/components/global";

import {
  AuthHeaderLinkText
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
            <P>{locale.signup.button_signin.msg}</P>
            <ButtonEmpyte
              style={{ marginLeft: 2 }}
              onPress={handleSignIn}
            >
              <AuthHeaderLinkText theme={theme}>{locale.signup.button_signin.text}</AuthHeaderLinkText>
            </ButtonEmpyte>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <H0 style={{ marginBottom: 10 }}>{locale.signup.title}</H0>
          <P>{locale.signup.description}</P>
        </View>
        <Form />
        {/*<Provider /> */}
      </View>
    </View>
  );
};

export default Register;
