import React, {
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { FirebaseContext } from "../../../../api/firebase";
import { ThemeContext, shadow } from "../../../../components/theme";
import { LocaleContext } from "../../../../components/locale";
import {
  Container,
  Body,
  Heading,
  View,
  Form,
  Input,
  TextInput,
  H0,
  P,
  PMini,
  Link,
  ButtonPrimary,
  TxtButton,
  TextError,
  TextValid,
  TextAlert,
  ButtonEmpyte,
} from "../../../../components/global";

const SignUp = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { signUp, signGoogle, signFacebook, signGithub, putUser } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordStrong, setPasswordStrong] = useState(null);
  const [rePasswordValid, setRePasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState("errorEmail");
  const [errorPassword, setErrorPassword] = useState("errorPassword");

  const emailValidate = (text) => {
    if (text !== '') {
      // eslint-disable-next-line no-useless-escape
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      setEmailValid(reg.test(text));
      setEmail(text ? text : '');
    }
  };

  const passwordValidate = (text) => {
    if (text !== '') {
      const regV = /^(?=.*[a-z])(?=.*[0-9]).{6,22}$/;
      setPasswordValid(regV.test(text));
      const regS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*#?&]).{6,22}$/;
      setPasswordStrong(regS.test(text));
      setPassword(text ? text : '');
    }
  };
  const rePasswordValidate = (text) => {
    if (passwordValid == true && text !== '') {
      const reg = text === password ? text : rePassword;
      setRePasswordValid(text === password ? true : false);
      setRePassword(reg);
    }
  };

  const loadData = () => {
    emailValidate();
    passwordValidate();
    rePasswordValidate();
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, rePassword);
      await putUser();
      await navigation.navigate("Loading");
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_missing_password);
        setEmailValid(true);
        setPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_wrong_password);
        setEmailValid(true);
        setPasswordValid(false);
      } else if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
        setPasswordValid(true);
      } else if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      } else if (error.code === "auth/missing-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_missing_email);
        setEmailValid(false);
      } else if (error.code === "auth/email-already-in-use") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_email_already_in_use);
        setEmailValid(false);
        setPasswordValid(true);
      } else {
        setErrorPassword(error.code);
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_create_user);
        setEmailValid(emailValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
        setPasswordStrong(passwordStrong == true ? true : false);
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleGoogle = async () => {
    try {
      await signGoogle();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.message);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleFacebook = async () => {
    try {
      await signFacebook();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.message);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const handleGithub = async () => {
    try {
      await signGithub();
      navigation.navigate("Loading");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShowPassword = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const handlePolicy = () => {
    navigation.navigate("Rules");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Body>
        <Heading style={{ marginBottom: 15, marginTop: 10 }}>
          <H0 style={{ marginBottom: 10 }}>{locale.global.app.name}</H0>
          <P>{locale.signup.description}</P>
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
        <Form style={{ marginTop: 10 }}>
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
              placeholder={locale.signup.text_input.email}
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
            {emailValid == false && email !== '' ? (
              <Ionicons
                style={{ padding: 10, marginRight: 5 }}
                name="alert-circle-outline"
                size={20}
                color={theme.error}
              />
            ) : emailValid == null && email !== '' ? (
              <Ionicons
                style={{ padding: 10, marginRight: 5 }}
                name="alert-circle-outline"
                size={20}
                color={theme.transparent}
              />
            ) : emailValid == true && email !== '' ? (
              <Ionicons
                style={{ padding: 10, marginRight: 5 }}
                name="checkmark-circle-outline"
                size={20}
                color={theme.secondary}
              />
            ) : null}
          </Input>
          <Input
            style={{
              ...shadow,
              marginBottom: 10,
              backgroundColor: `${
                error === errorPassword && passwordValid == false
                  ? theme.inputError
                  : theme.backgroundSecondary
              }`,
            }}
          >
            <TextInput
              ref={passwordRef}
              placeholder={locale.signup.text_input.password}
              placeholderTextColor={theme.placeholder}
              selectionColor={theme.primary}
              autoCapitalize="none"
              autoComplete="new-password"
              maxLength={22}
              secureTextEntry={secureTextEntry}
              returnKeyType="next"
              onChangeText={passwordValidate}
              onSubmitEditing={() => {rePasswordRef.current.focus()}}
            />
            {passwordStrong == false && passwordValid == true ? (
              <Ionicons
                style={{ padding: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.primary}
              />
            ) : passwordValid == false && password !== '' ? (
              <Ionicons
                style={{ padding: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.error}
              />
            ) : passwordStrong == true && password !== '' ? (
              <Ionicons
                style={{ padding: 10 }}
                name="checkmark-circle-outline"
                size={20}
                color={theme.secondary}
              />
            ) : (
              <Ionicons
                style={{ padding: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.transparent}
              />
            )}
            <ButtonEmpyte style={{marginRight: 15}} onPress={handleShowPassword}>
              <Ionicons name={secureTextEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
            </ButtonEmpyte>
          </Input>
          {passwordStrong == false && passwordValid == true ? (
            <TextAlert>Password medium</TextAlert>
          ) : passwordValid == false && password !== '' ? (
            <TextError>Password weak</TextError>
          ) : passwordStrong == true && password !== '' ? (
            <TextValid>Password strong</TextValid>
          ) : (
            <TextError></TextError>
          )}
          <Input
            style={{
              ...shadow,
              marginBottom: 10,
              backgroundColor: `${
                error === errorPassword && rePasswordValid == false
                  ? theme.inputError
                  : theme.backgroundSecondary
              }`,
            }}
          >
            <TextInput
              ref={rePasswordRef}
              placeholder={locale.signup.text_input.confirm_password}
              placeholderTextColor={theme.placeholder}
              selectionColor={theme.primary}
              autoCapitalize="none"
              autoComplete="new-password"
              maxLength={22}
              secureTextEntry={secureTextEntry}
              returnKeyType="done"
              onChangeText={rePasswordValidate}
              onSubmitEditing={handleSignUp}
            />
            {rePasswordValid == false && rePassword !== '' ? (
              <Ionicons
                style={{ padding: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.error}
              />
            ) : (
              <Ionicons
                style={{ padding: 10 }}
                name="alert-circle-outline"
                size={20}
                color={theme.transparent}
              />
            )}
            {rePasswordValid == true && rePassword !== '' ? (
              <Ionicons
                style={{ padding: 10 }}
                name="checkmark-circle-outline"
                size={20}
                color={theme.secondary}
              />
            ) : null}
            <ButtonEmpyte style={{marginRight: 15}} onPress={handleShowPassword}>
              <Ionicons name={secureTextEntry? 'eye-outline': 'eye-off-outline'} size={20} color={theme.text} />
            </ButtonEmpyte>
          </Input>
          {error ? (
            <TextError>{errorMsg}</TextError>
          ) : (
            <TextError></TextError>
          )}
          <ButtonPrimary
            style={shadow}
            onPress={handleSignUp}
            accessibilityLabel={locale.signup.button.accessibility}
          >
            <TxtButton>{locale.signup.title}</TxtButton>
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

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;