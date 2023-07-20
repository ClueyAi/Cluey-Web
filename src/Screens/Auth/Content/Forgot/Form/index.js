import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useLocation } from 'react-router-dom';
import Ionicons from "@expo/vector-icons/Ionicons";

import { LocaleContext } from "/src/components/locale";
import { FirebaseContext } from "/src/api/firebase";
import { ThemeContext, shadow } from "/src/components/theme";
import {
  View,
  TxtButton,
  TextError,
} from "/src/components/global";

import {
  CustomTextInput,
  AuthInput,
  AuthButton,
  AuthTitle,
  AuthText
} from '../../../../components';
import { navigate } from '../../../../functions';

const Form = () => {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const { forgot } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [sendRecovery, setSendRecovery] = useState(false);

  const [loading, setLoading] = useState(false);

  const {goTo} = navigate();

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const handleForgot = async () => {
    setLoading(true);
    try {
      await forgot(email);
      setSendRecovery(true);
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/user-not-found") {
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      }
      if (error.code === "auth/invalid-email") {
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    goTo('/auth', {state: {route: 'Login'}});
  };

  useEffect(() => {
    setEmail(location.state?.email??'');
  }, [location]);

  if (sendRecovery) {
    return (
      <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 25, marginTop: 20 }}>
        <AuthTitle>{locale.forgot.success.title}</AuthTitle>
        <View style={{width: '50%', marginTop: 10, marginBottom: 20}}>
          <AuthText theme={theme}>{locale.forgot.success.description}</AuthText>
        </View>
        <AuthTitle>{locale.forgot.success.alert_tittle}</AuthTitle>
        <View style={{width: '50%', marginTop: 10, marginBottom: 10}}>
          <AuthText theme={theme}>{locale.forgot.success.alert_msg}</AuthText>
        </View>
        <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
          <AuthButton
            theme={theme}
            style={shadow}
            onPress={handleSignIn}
          >
            {loading ?
              <ActivityIndicator size="small" color={theme.background} />
              :
              <TxtButton>{locale.forgot.success.button.text}</TxtButton>
            }
          </AuthButton>
        </View>
      </View>
    );
  }

  return (
    <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 25, marginTop: 20 }}>
      <AuthInput
        style={{
          ...shadow,
          borderColor: `${
            emailValid&&error!==''?theme.error:theme.text
          }`,
        }}
      >
        <Ionicons
          style={{ padding: 10, marginRight: 5 }}
          name="at-outline"
          size={18}
          color={emailValid&&email!==''?theme.secondary:!emailValid&&email!==''?theme.error:theme.text}
        />
        <CustomTextInput
          name={"email"}
          theme={theme}
          placeholder={locale.signin.text_input.email}
          placeholderTextColor={theme.placeholder}
          selectionColor={theme.primary}
          autoCapitalize="none"
          autoCorrect={false}
          inputMode="email"
          autoComplete="email"
          maxLength={100}
          returnKeyType="next"
          validation={emailValidate}
          onSubmitEditing={handleForgot}
        />
      </AuthInput>
      {error ? (
        <TextError theme={theme}>{errorMsg}</TextError>
      ) : (
        <TextError theme={theme}> </TextError>
      )}
      <View style={{width: 400, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <AuthButton
          theme={theme}
          style={shadow}
          onPress={handleForgot}
        >
          {loading ?
            <ActivityIndicator size="small" color={theme.background} />
            :
            <TxtButton>{locale.forgot.button.text}</TxtButton>
          }
        </AuthButton>
      </View>
    </View>
  );
};

export default Form;
