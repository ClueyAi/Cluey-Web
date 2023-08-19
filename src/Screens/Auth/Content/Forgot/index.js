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
            <LinkButton
              style={{ marginLeft: 2 }}
              onPress={handleSignIn}
            >
              <AuthHeaderLinkText theme={theme}>{locale.forgot.button_signin.text}</AuthHeaderLinkText>
            </LinkButton>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <AuthHeaderText style={{ marginBottom: 10 }}>{locale.forgot.title}</AuthHeaderText>
          <AuthHeaderP>{locale.forgot.description}</AuthHeaderP>
        </View>
        <Form />
      </View>
    </View>
  );
};

export default Forgot;
