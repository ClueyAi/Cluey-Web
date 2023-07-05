import React, { useState, useContext, useRef } from "react";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { FirebaseContext } from "../../../../../../api/firebase";
import { ThemeContext, shadow } from "../../../../../../components/theme";
import { LocaleContext } from "../../../../../../components/locale";
import {
  Form,
  Input,
  TextInput,
  TxtButton,
  TextAlert,
  TextValid,
  TextError,
  ButtonPrimary,
} from "../../../../../../components/global";
import {
  UserContent
} from '../../../../../components';
import { navigate } from '../../../../../functions';


const Password = () => {
  const { locale } = useContext(LocaleContext);
  const { user, updateUserPassword } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const currentPasswordRef = useRef(null);
  const passwordRef = useRef(null);
  const rePasswordRef = useRef(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [currentPasswordValid, setCurrentPasswordValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordStrong, setPasswordStrong] = useState(null);
  const [rePasswordValid, setRePasswordValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorPassword, setErrorPassword] = useState("errorPassword");
  const {goHome} = navigate();

  const currentPasswordValidate = (text) => {
    setCurrentPassword(text);
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

  const confirmation = () => {
    return Alert.alert(
      locale.alert.password_change.title,
      locale.alert.password_change.message,
      [
        {
          text: locale.alert.ok,
          onPress: async () => {
            try {
              goHome();
            } catch (error) {
              alert(error.message)
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleChange = async () => {
    try {
      await updateUserPassword(currentPassword, rePassword);
      confirmation();
    } catch (error) {
      setError(error.code);
      if (error.code === "auth/missing-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_missing_password);
        setCurrentPasswordValid(false);
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_wrong_password);
        setCurrentPasswordValid(false);
      } else {
        setErrorPassword(error.code);
        setErrorMsg(locale.error.auth_connect_user);
        setCurrentPasswordValid(currentPasswordValid == true ? true : false);
        setPasswordValid(passwordValid == true ? true : false);
      }
    }
  };

  return (
    <UserContent>
      <Form style={{flex: 1, marginTop: 40, alignSelf: 'center'}}>
        <Input
          style={{
            ...shadow,

            marginBottom: 15,
            backgroundColor: `${
              currentPasswordValid == false ? theme.inputError : theme.backgroundSecondary
            }`,
          }}
        >
          <TextInput
            ref={currentPasswordRef}
            placeholder={locale.password_config.current_password}
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
            autoCapitalize="none"
            autoComplete="current-password"
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={currentPasswordValidate}
            onSubmitEditing={() => {passwordRef.current.focus()}}
          />
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
            placeholder={locale.password_config.password}
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
            autoCapitalize="none"
            autoComplete="new-password"
            secureTextEntry={true}
            returnKeyType="next"
            onChangeText={passwordValidate}
            onSubmitEditing={() => {rePasswordRef.current.focus()}}
          />
          {passwordStrong == false && passwordValid == true ? (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="alert-circle-outline"
              size={20}
              color={theme.primary}
            />
          ) : passwordValid == false && password !== '' ? (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="alert-circle-outline"
              size={20}
              color={theme.error}
            />
          ) : passwordStrong == true && password !== '' ? (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="checkmark-circle-outline"
              size={20}
              color={theme.secondary}
            />
          ) : (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="alert-circle-outline"
              size={20}
              color={theme.transparent}
            />
          )}
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
            placeholder={locale.password_config.confirm_password}
            placeholderTextColor={theme.placeholder}
            selectionColor={theme.primary}
            autoCapitalize="none"
            autoComplete="new-password"
            secureTextEntry={true}
            returnKeyType="done"
            onChangeText={rePasswordValidate}
            onSubmitEditing={handleChange}
          />
          {rePasswordValid == false && rePassword !== '' ? (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="alert-circle-outline"
              size={20}
              color={theme.error}
            />
          ) : (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="alert-circle-outline"
              size={20}
              color={theme.transparent}
            />
          )}
          {rePasswordValid == true && rePassword !== '' ? (
            <Ionicons
              style={{ padding: 10, marginRight: 10 }}
              name="checkmark-circle-outline"
              size={20}
              color={theme.secondary}
            />
          ) : null}
        </Input>
        {error ? (
          <TextError>{errorMsg}</TextError>
        ) : (
          <TextError></TextError>
        )}
        <ButtonPrimary
          style={shadow}
          onPress={handleChange}
          accessibilityLabel={locale.password_config.change_button.accessibility}
        >
          <TxtButton>{locale.password_config.change_button.text}</TxtButton>
        </ButtonPrimary>
      </Form>
    </UserContent>
  );
};

export default Password;