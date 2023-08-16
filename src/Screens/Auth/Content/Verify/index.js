import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LocaleContext } from "../../../../components/locale";
import { FirebaseContext } from "/src/api/firebase";
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

const Verify = () => {
  const { locale } = useContext(LocaleContext);
  const { signOut } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const [localeLoaded, setLocaleLoaded] = useState(false);

  const {goTo} = navigate();

  const handleSignIn = async () => {
    await signOut();
    goTo('/auth', {state: {route: 'Login'}});
  };

  useEffect(() => {
    if (locale) {
      setLocaleLoaded(true);
    }
  }, [locale]);

  if (!localeLoaded) {
    return null;
  }

  return (
    <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
      <View style={{ width: '100%', padding: 20}}>
        <View style={{ marginRight: '4%', marginTop: 10 }}>
          <View style={{flexDirection: "row", width: '100%',  alignItems: 'center', justifyContent: 'flex-end'}}>
            <ButtonEmpyte
              style={{ marginLeft: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              onPress={handleSignIn}
            >
              <AuthHeaderLinkText theme={theme}>{locale.forgot.button_signin.text}</AuthHeaderLinkText>
              <Ionicons style={{ padding: 10, marginRight: 5 }} name="log-out-outline" size={18} color={theme.primary} />
            </ButtonEmpyte>
          </View>
        </View>
        <View style={{ width: '100%', padding: 20, marginTop: '20%', alignItems: 'flex-start'}}>
          <H0 style={{ marginBottom: 10 }}>{locale.verify.title}</H0>
          <P>{locale.verify.description}</P>
        </View>
        <Form />
      </View>
    </View>
  );
};

export default Verify;
