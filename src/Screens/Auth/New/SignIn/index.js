import React, { useState, useContext, useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { AuthContext } from "../../../../api/firebase";
import { FirestoreContext } from "../../../../api/firebase";
import { ThemeContext, shadow } from "../../../../components/theme";
import { LocaleContext } from "../../../../components/locale";
import {
  Container,
  Heading,
  Body,
  View,
  Form,
  Input,
  TextInput,
  H0,
  P,
  PMini,
  Link,
  TxtLink,
  ButtonPrimary,
  ButtonEmpyte,
  TxtButton,
  TextError,
} from "../../../../components/styles";

const SignIn = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { signIn, signGoogle, signFacebook, signGithub } = useContext(AuthContext);
  const { putUser } = useContext(FirestoreContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [errorPassword, setErrorPassword] = useState('');

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const passwordValidate = (text) => {
    if (emailValid == true) {
      setPasswordValid(true);
      setPassword(text);
    } else {
      setPasswordValid(false);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
      await putUser();
      await navigation.navigate("Loading");
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_missing_password);
        setPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_wrong_password);
        setPasswordValid(false);
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      } else {
        setErrorPassword(error.code);
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_connect_user);
        setEmailValid(emailValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleGoogle = async () => {
    try {
      await signGoogle();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.code);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleFacebook = async () => {
    try {
      await signFacebook();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.code);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleGithub = async () => {
    try {
      await signGithub();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.code);
    }
  };

  const handleShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handleForgot = () => {
    navigation.navigate("Forgot");
  };
  const handlePolicy = () => {
    navigation.navigate("Rules");
  };

  return (
    <Container>
      <Body>
        <Heading style={{ marginBottom: 15, marginTop: 10 }}>
          <H0 style={{ marginBottom: 10 }}>{locale.global.app.name}</H0>
          <P>{locale.signin.description}</P>
        </Heading>
        {/*
        <Providers>
          <ButtonProvider
            style={shadow}
            onPress={handleGoogle}
            accessibilityLabel={
              locale.providers.button_google.accessibility
            }
          >
            <TxtProvider style={{ left: 30 }}>
              {locale.providers.button_google.text}
            </TxtProvider>
            <FontAwesome
              style={{ right: 30 }}
              name="google"
              size={22}
              color={theme.text}
            />
          </ButtonProvider>
          <ButtonProvider
            style={{ ...shadow, marginTop: 15 }}
            onPress={handleFacebook}
            accessibilityLabel={
              locale.providers.button_facebook.accessibility
            }
          >
            <TxtProvider style={{ left: 30 }}>
              {locale.providers.button_facebook.text}
            </TxtProvider>
            <FontAwesome
              style={{ right: 34 }}
              name="facebook"
              size={22}
              color={theme.text}
            />
          </ButtonProvider>
          <ButtonProvider
            style={{ ...shadow, marginTop: 15 }}
            onPress={handleGithub}
            accessibilityLabel={
              locale.providers.button_github.accessibility
            }
          >
            <TxtProvider style={{ left: 30 }}>
              {locale.providers.button_github.text}
            </TxtProvider>
            <FontAwesome
              style={{ right: 30 }}
              name="github"
              size={24}
              color={theme.text}
            />
          </ButtonProvider>
        </Providers>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            justifiContents: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Divider />
          <H2Mini>{locale.providers.or}</H2Mini>
          <Divider />
        </View>
        */}
        <Form style={{ marginTop: 20 }}>
          <Input
            style={{
              ...shadow,
              marginBottom: 15,
              backgroundColor: `${
                error === errorEmail && emailValid == false
                  ? theme.inputError
                  : theme.backgroundSecondary
              }`,
            }}
          >
            <TextInput
              ref={emailRef}
              placeholder={locale.signin.text_input.email}
              placeholderTextColor={theme.placeholder}
              selectionColor={theme.primary}
              autoCapitalize="none"
              autoCorrect={false}
              inputMode="email"
              autoComplete="email"
              maxLength={100}
              returnKeyType="next"
              onChangeText={emailValidate}
              onSubmitEditing={() => {passwordRef.current.focus()}}
            />
            {emailValid == false && email !== '' ?
              <Ionicons
                style={{ padding: 10, marginRight: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.error}
              />
              : 
              <Ionicons
                style={{ padding: 10, marginRight: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.transparent}
              />
            }
            {emailValid == true && email !== '' ?
              <Ionicons
                style={{ padding: 10, marginRight: 10 }}
                name="checkmark-circle-outline"
                size={20}
                color={theme.secondary}
              />
              : null}
          </Input>
          <Input
            style={{
              ...shadow,
              marginBottom: 10,
              backgroundColor: `${
                passwordValid == false ? theme.inputError : theme.backgroundSecondary
              }`,
            }}
          >
            <TextInput
              ref={passwordRef}
              placeholder={locale.signin.text_input.password}
              placeholderTextColor={theme.placeholder}
              selectionColor={theme.primary}
              autoCapitalize="none"
              autoComplete="current-password"
              maxLength={22}
              secureTextEntry={secureTextEntry}
              returnKeyType="done"
              onChangeText={passwordValidate}
              onSubmitEditing={handleSignIn}
            />
            <ButtonEmpyte style={{marginRight: 15}} onPress={handleShowPassword}>
              <Ionicons name={secureTextEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
            </ButtonEmpyte>
          </Input>
          <ButtonEmpyte onPress={handleForgot}>
            <TxtLink>{locale.forgot.title}</TxtLink>
          </ButtonEmpyte>
          {error ? 
            <TextError>{errorMsg}</TextError>
            : 
            <TextError> </TextError>
          }
          <ButtonPrimary
            style={shadow}
            onPress={handleSignIn}
            accessibilityLabel={locale.signin.button.accessibility}
          >
            <TxtButton>{locale.signin.button.text}</TxtButton>
          </ButtonPrimary>
        </Form>
      </Body>
      <View style={{ marginBottom: "10%", alignItems: "center" }}>
        <PMini>{locale.welcome.footer}</PMini>
        <ButtonEmpyte
          onPress={handlePolicy}
          ccessibilityLabel={locale.global.app.policy_terms.accessibility}
        >
          <Link>{locale.global.app.policy_terms.title}</Link>
        </ButtonEmpyte>
      </View>
    </Container>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignIn;
