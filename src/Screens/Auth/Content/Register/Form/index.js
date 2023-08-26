import React, { useState, useContext, useRef, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useLocation } from 'react-router-dom';
import Ionicons from "@expo/vector-icons/Ionicons";

import { LocaleContext } from "/src/components/locale";
import { FirebaseContext } from "/src/api/firebase";
import { ThemeContext, shadow } from "/src/components/theme";

import {
  View,
  LinkButton,
  CustomTextInput,
  AuthInput,
  AuthButton,
  AuthButtonTxtButton,
  AuthTextError,
  AuthTextValid,
  AuthTextAlert
} from '../../../../components';
import { navigate } from '../../../../functions';

const Form = () => {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const { user, signUp, putUser, emailVerify } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [securePEntry, setSecurePEntry] = useState(true);
  const [secureRPEntry, setSecureRPEntry] = useState(true);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordStrong, setPasswordStrong] = useState(null);
  const [rePasswordValid, setRePasswordValid] = useState(false);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [loading, setLoading] = useState(false);
  const [shouldGoHome, setShouldGoHome] = useState(false);

  const {goHome} = navigate();

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const passwordValidate = (text) => {
    if (emailValid) {
      const regV = /^(?=.*[a-z])(?=.*[0-9]).{6,22}$/;
      setPasswordValid(regV.test(text));
      const regS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{6,22}$/;
      setPasswordStrong(regS.test(text));
      setPassword(text);
      setRePasswordValid(text === rePassword ? true : false);
    } else {
      setRePasswordValid(false);
      setEmail('');
    }
  };

  const rePasswordValidate = (text) => {
    if (passwordValid) {
      setRePasswordValid(text === password ? true : false);
      setRePassword(text);
    } else {
      setEmail('');
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await signUp(email, rePassword);
      await putUser();
      await emailVerify();
      setShouldGoHome(true);
      setLoading(false);
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorMsg(locale.error.auth_missing_password);
        setEmailValid(true);
        setPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorMsg(locale.error.auth_wrong_password);
        setEmailValid(true);
        setPasswordValid(false);
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
        setPasswordValid(true);
      } else if (error.code === "auth/invalid-email") {
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      } else if (error.code === "auth/missing-email") {
        setErrorMsg(locale.error.auth_missing_email);
        setEmailValid(false);
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMsg(locale.error.auth_email_already_in_use);
        setEmailValid(false);
        setPasswordValid(true);
      } else {
        setErrorMsg(locale.error.auth_create_user);
        setEmailValid(emailValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
        setPasswordStrong(passwordStrong == true ? true : false);
      }
    }
  };

  const handleShowPassword = () => {
    setSecurePEntry(!securePEntry);
  };
  const handleShowRePassword = () => {
    setSecureRPEntry(!secureRPEntry);
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
        theme={theme}
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
          color={!passwordStrong&&passwordValid&&password!==''?theme.primary:!passwordValid&&password!==''?theme.error:passwordStrong&&password!==''?theme.secondary:theme.text}
        />
        <CustomTextInput
          ref={passwordRef}
          name={"password"}
          theme={theme}
          placeholder={locale.signin.text_input.password}
          placeholderTextColor={theme.placeholder}
          selectionColor={theme.primary}
          autoCapitalize="none"
          autoComplete="new-password"
          maxLength={22}
          secureTextEntry={securePEntry}
          returnKeyType="done"
          validation={passwordValidate}
          onSubmitEditing={() => {rePasswordRef.current.focus()}}
        />
        <LinkButton style={{marginRight: 15}} onPress={handleShowPassword}>
          <Ionicons name={securePEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
        </LinkButton>
      </AuthInput>
      {passwordStrong == false && passwordValid == true ? (
        <AuthTextAlert theme={theme}>Password medium</AuthTextAlert>
      ) : passwordValid == false && password !== '' ? (
        <AuthTextError theme={theme}>Password weak</AuthTextError>
      ) : passwordStrong == true && password !== '' ? (
        <AuthTextValid theme={theme}>Password strong</AuthTextValid>
      ) : (
        <AuthTextError theme={theme}></AuthTextError>
      )}
      <AuthInput
        theme={theme}
        style={{
          ...shadow,
          borderColor: `${
            !rePasswordValid&&error!==''?theme.error:theme.text
          }`,
        }}
      >
        <Ionicons
          style={{ padding: 10, marginRight: 5 }}
          name="finger-print-outline"
          size={18}
          color={!rePasswordValid&&rePassword!==''?theme.error:rePasswordValid&&!passwordStrong&&rePassword!==''?theme.primary:rePasswordValid&&passwordStrong&&rePassword!==''?theme.secondary:theme.text}
        />
        <CustomTextInput
          ref={rePasswordRef}
          name={"rePassword"}
          theme={theme}
          placeholder={locale.signup.text_input.confirm_password}
          placeholderTextColor={theme.placeholder}
          selectionColor={theme.primary}
          autoCapitalize="none"
          autoComplete="new-password"
          maxLength={22}
          secureTextEntry={secureRPEntry}
          returnKeyType="done"
          validation={rePasswordValidate}
          onSubmitEditing={handleSignUp}
        />
        <LinkButton style={{marginRight: 15}} onPress={handleShowRePassword}>
          <Ionicons name={secureRPEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
        </LinkButton>
      </AuthInput>
      {error ? (
        <AuthTextError theme={theme}>{errorMsg}</AuthTextError>
      ) : (
        <AuthTextError theme={theme}> </AuthTextError>
      )}
      <View style={{width: 400, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <AuthButton
          theme={theme}
          style={shadow}
          onPress={handleSignUp}
        >
          {loading ?
            <ActivityIndicator size="small" color={theme.background} />
            :
            <AuthButtonTxtButton theme={theme}>{locale.signup.button.text}</AuthButtonTxtButton>
          }
        </AuthButton>
      </View>
    </View>
  );
};

export default Form;
