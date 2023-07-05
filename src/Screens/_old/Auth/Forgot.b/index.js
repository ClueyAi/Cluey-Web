import React, { useState, useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { FirebaseContext } from "../../../../api/firebase";
import { ThemeContext, shadow } from "../../../../components/theme";
import { LocaleContext } from "../../../../components/locale";
import {
  Container,
  Heading,
  Body,
  View,
  Form,
  Input,
  Link,
  ButtonEmpyte,
  TextInput,
  H1,
  H3,
  P,
  PMini,
  ButtonPrimary,
  TxtButton,
  TextError,
  FooterSmall,
} from "../../../../components/global";

const Forgot = ({ navigation }) => {
  const { locale } = useContext(LocaleContext);
  const { forgot } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const [sendRecovery, setSendRecovery] = useState(false);

  const emailValidate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    setEmailValid(reg.test(text));
    setEmail(text);
  };

  const handleForgot = async () => {
    try {
      await forgot(email);
      setSendRecovery(true);
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/user-not-found") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_user_not_found);
        setEmailValid(false);
      }
      if (error.code === "auth/invalid-email") {
        setErrorEmail(error.code);
        setErrorMsg(locale.error.auth_invalid_email);
        setEmailValid(false);
      }
    }
  };

  const handleContinue = () => {
    navigation.goBack();
  };

  const handlePolicy = () => {
    navigation.navigate("Rules");
  };

  if (sendRecovery == false) {
    return (
      <Container>
        <Body>
          <Heading style={{  marginBottom: 15, marginTop: 10 }}>
            <H1 style={{ marginBottom: 10 }}>{locale.forgot.title}</H1>
            <P>{locale.forgot.description}</P>
          </Heading>
          <Form>
            <Input
              style={{
                ...shadow,
                marginBottom: 10,
                backgroundColor: `${
                  error === errorEmail && emailValid == false
                    ? theme.inputError
                    : theme.backgroundSecondary
                }`,
              }}
            >
              <TextInput
                placeholder={locale.forgot.text_input.email}
                placeholderTextColor={theme.placeholder}
                selectionColor={theme.primary}
                autoCapitalize="none"
                autoCorrect={false}
                inputMode="email"
                autoComplete="email"
                maxLength={100}
                returnKeyType="done"
                onChangeText={emailValidate}
                onSubmitEditing={handleForgot}
              />
              {emailValid == false ?
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
              {emailValid == true ?
                <Ionicons
                  style={{ padding: 10, marginRight: 10 }}
                  name="checkmark-circle-outline"
                  size={20}
                  color={theme.secondary}
                />
                : null}
            </Input>
            {error ?
              <TextError>{errorMsg}</TextError>
              :
              <TextError></TextError>
            }
            <ButtonPrimary
              style={shadow}
              onPress={handleForgot}
              accessibilityLabel={locale.forgot.button.accessibility}
            >
              <TxtButton>{locale.forgot.button.text}</TxtButton>
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
  } else {
    return (
      <Container>
        <Heading style={{ marginTop: "30%", marginBottom: 15 }}>
          <H1 style={{ marginBottom: 10, fontSize: 25 }}>
            {locale.forgot.success.title}
          </H1>
          <P>{locale.forgot.success.description}</P>
          <H3 style={{ marginTop: 30, marginBottom: 5 }}>
            {locale.forgot.success.alert_tittle}
          </H3>
          <PMini>{locale.forgot.success.alert_msg}</PMini>
        </Heading>
        <ButtonPrimary
          style={{...shadow, marginTop: 10}}
          onPress={handleContinue}
          accessibilityLabel={locale.forgot.success.Button.accessibility}
        >
          <TxtButton>{locale.forgot.success.Button.text}</TxtButton>
        </ButtonPrimary>
        <FooterSmall style={{ position: 'absolute', bottom: '1%' }}>
          <H1>{locale.global.app.name}</H1>
        </FooterSmall>
      </Container>
    );
  }
};

Forgot.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Forgot;
