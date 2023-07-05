import React, { useState, useContext, useRef } from "react";

import { LocaleContext } from "../../../../components/locale";
import { ThemeContext } from "../../../../components/theme";
import {
  View,
  H0, P,
  ButtonEmpyte,
} from "../../../../components/global";

import {
  AuthHeaderLinkText
} from '../../../components';
import { navigate } from '../../../functions';

import Form from './Form';
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
            <P>{locale.signin.button_signup.msg}</P>
            <ButtonEmpyte
              style={{ marginLeft: 2 }}
              onPress={handleSignUp}
            >
              <AuthHeaderLinkText theme={theme}>{locale.signin.button_signup.text}</AuthHeaderLinkText>
            </ButtonEmpyte>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <H0 style={{ marginBottom: 10 }}>{locale.signin.title}</H0>
          <P>{locale.signin.description}</P>
        </View>
        <Form />
        {/*<Provider /> */}  
      </View>
    </View>
  );
};

export default Login;
