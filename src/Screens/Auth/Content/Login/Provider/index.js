import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigate } from 'react-router-dom';

import { LocaleContext } from "/src/components/locale";
import { ProvidersContext } from "/src/api/providers";
import { ThemeContext } from "/src/components/theme";

import {
  View,
  LinkButton,
  TxtProvider
} from '../../../../components'

const Provider = () => {
  const { locale } = useContext(LocaleContext);
  const { signInWithGoogle } = useContext(ProvidersContext);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error('google', error);
    }
  };

  const handleFacebook = async () => {
    alert("Facebook");
  };

  const handleGithub = async () => {
    alert("Github");
  };

  return (
    <View style={{width: '100%', marginTop: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
      <TxtProvider style={{ marginLeft: 30 }}>
        {locale.providers.text}
      </TxtProvider>
      <LinkButton theme={theme} onPress={handleGoogle}>
        <FontAwesome
          style={{ margin: 25 }}
          name="google"
          size={22}
          color={theme.text}
        />
      </LinkButton>
      <LinkButton theme={theme} onPress={handleFacebook}>
        <FontAwesome
          style={{ margin: 25 }}
          name="facebook"
          size={22}
          color={theme.text}
        />
      </LinkButton>
      <LinkButton theme={theme} onPress={handleGithub}>
        <FontAwesome
          style={{ margin: 25 }}
          name="github"
          size={24}
          color={theme.text}
        />
      </LinkButton>
    </View>
  );
};

export default Provider;
