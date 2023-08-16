import React, { useState, useContext, useRef, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useLocation } from 'react-router-dom';
import Ionicons from "@expo/vector-icons/Ionicons";

import { LocaleContext } from "/src/components/locale";
import { FirebaseContext } from "/src/api/firebase";
import { ThemeContext, shadow } from "/src/components/theme";
import {
  View,
  ButtonEmpyte,
  TxtButton,
  TextError,
} from "/src/components/global";

import {
  CustomTextInput,
  AuthLink,
  AuthLinkText,
  AuthInput,
  AuthButton,
} from '../../../../components';
import { navigate } from '../../../../functions';

const Form = () => {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const { signIn, user, putUser } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [loading, setLoading] = useState(false);
  const [shouldGoHome, setShouldGoHome] = useState(false);


  const {goHome, goTo} = navigate();

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const passwordValidate = (text) => {
    if (emailValid) {
      setPasswordValid(true);
      setPassword(text);
    } else {
      setPasswordValid(false);
      setEmail('');
    }
  };

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn(email, password);
      await putUser();
      setShouldGoHome(true);
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorMsg(locale.error.auth_missing_password);
        setPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg(locale.error.auth_wrong_password);
        setPasswordValid(false);
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      } else {
        setErrorMsg(locale.error.auth_connect_user);
        setEmailValid(emailValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleForgot = () => {
    goTo('/auth', {state: {route: 'Forgot'}});
  };

  useEffect(() => {
    setEmail(location.state?.email??'');
    if (shouldGoHome && user) {
      goHome();
    }
  }, [location, shouldGoHome, user]);

  return (
    <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 25, marginTop: 20 }}>
      <AuthInput
        style={{
          ...shadow,
          borderColor: `${
            !emailValid&&error!==''?theme.error:theme.text
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
          ref={emailRef}
          name={"email"}
          value={email}
          email={email}
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
          onSubmitEditing={() => {passwordRef.current.focus()}}
        />
      </AuthInput>
      <AuthInput
        theme={theme}
        style={{
          ...shadow,
          borderColor: `${
            !passwordValid&&error!==''?theme.error:theme.text
          }`,
        }}
      >
        <Ionicons
          style={{ padding: 10, marginRight: 5 }}
          name="finger-print-outline"
          size={18}
          color={!passwordValid&&password!==''?theme.error:passwordValid&&password!==''?theme.secondary:theme.text}
        />
        <CustomTextInput
          ref={passwordRef}
          name={"password"}
          theme={theme}
          placeholder={locale.signin.text_input.password}
          placeholderTextColor={theme.placeholder}
          selectionColor={theme.primary}
          autoCapitalize="none"
          autoComplete="current-password"
          maxLength={22}
          secureTextEntry={secureTextEntry}
          returnKeyType="done"
          validation={passwordValidate}
          onSubmitEditing={handleSignIn}
        />
        <ButtonEmpyte style={{marginRight: 15}} onPress={handleShowPassword}>
          <Ionicons name={secureTextEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
        </ButtonEmpyte>
      </AuthInput>
      {error ? (
        <TextError theme={theme}>{errorMsg}</TextError>
      ) : (
        <TextError theme={theme}></TextError>
      )}
      <View style={{width: 400, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <AuthButton
          theme={theme}
          style={shadow}
          onPress={handleSignIn}
        >
          {loading ?
            <ActivityIndicator size="small" color={theme.background} />
            :
            <TxtButton>{locale.signin.button.text}</TxtButton>
          }
        </AuthButton>
        <AuthLink onPress={handleForgot}>
          <AuthLinkText theme={theme}>{locale.forgot.title}</AuthLinkText>
        </AuthLink>
      </View>
    </View>
  );
};

export default Form;
