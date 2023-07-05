import React, { useState, useContext, useRef } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigate } from 'react-router-dom';

import { LocaleContext } from "../../../../../components/locale";
import { ProvidersContext } from "../../../../../api/providers";
import { ThemeContext } from "../../../../../components/theme";
import {
  View,
  TxtProvider,
} from "../../../../../components/global";

import {
  LinkButton,
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
      <LinkButton onPress={handleGoogle}>
        <FontAwesome
          style={{ margin: 25 }}
          name="google"
          size={22}
          color={theme.text}
        />
      </LinkButton>
      <LinkButton onPress={handleFacebook}>
        <FontAwesome
          style={{ margin: 25 }}
          name="facebook"
          size={22}
          color={theme.text}
        />
      </LinkButton>
      <LinkButton onPress={handleGithub}>
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
