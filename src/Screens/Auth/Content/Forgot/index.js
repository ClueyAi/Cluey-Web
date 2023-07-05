import React, { useContext } from "react";

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

const Forgot = () => {
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
          <View style={{flexDirection: "row", width: '100%',  alignItems: 'center', justifyContent: 'flex-end'}}>
            <ButtonEmpyte
              style={{ marginLeft: 2 }}
              onPress={handleSignIn}
            >
              <AuthHeaderLinkText theme={theme}>{locale.forgot.button_signin.text}</AuthHeaderLinkText>
            </ButtonEmpyte>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <H0 style={{ marginBottom: 10 }}>{locale.forgot.title}</H0>
          <P>{locale.forgot.description}</P>
        </View>
        <Form />
      </View>
    </View>
  );
};

export default Forgot;
