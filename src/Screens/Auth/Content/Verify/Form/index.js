import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { useLocation } from 'react-router-dom';
import Ionicons from "@expo/vector-icons/Ionicons";

import { LocaleContext } from "../../../../../components/locale";
import { FirebaseContext } from "../../../../../api/firebase";
import { ThemeContext, shadow } from "../../../../../components/theme";
import {
  View,
  ButtonEmpyte,
  TxtButton,
  TextError,
} from "../../../../../components/global";

import {
  CountDown,
  CustomTextInput,
  AuthLink,
  AuthLinkText,
  AuthInput,
  AuthButton,
  AuthTitle,
  AuthText
} from '../../../../components';
import { navigate } from '../../../../functions';

const Form = () => {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);
  const { forgot, emailVerify } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);

  const [error, setError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [sendRecovery, setSendRecovery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sended, setSended] = useState(false);

  const {goHome} = navigate();

  const handleSendRecovery = () => {
    setSended(!sended);  
  };

  const handleVerify = () => {
    emailVerify();
    handleSendRecovery();
  };

  const handleContinue = () => {
    goHome();
  };

  useEffect(() => {
    setEmail(location.state?.email??'');

    const storedRemainingSeconds = parseInt(localStorage.getItem('remainingSeconds'));
    if (storedRemainingSeconds > 0) {
      setSended(true);
    };
  }, [location]);

  return (
    <View style={{ width: '100%', alignItems: 'flex-start', marginLeft: 25, marginTop: 20 }}>
      <AuthTitle>{locale.verify.content.title}</AuthTitle>
      <View style={{width: '50%', marginTop: 10, marginBottom: 20}}>
        <AuthText>{locale.verify.content.description}</AuthText>
      </View>
      <AuthTitle>{locale.verify.content.alert_tittle}</AuthTitle>
      <View style={{width: '50%', marginTop: 10, marginBottom: 10}}>
        <AuthText>{locale.verify.content.alert_msg}</AuthText>
      </View>
      {sended?<AuthLinkText theme={theme}><CountDown seconds={60} endTime={handleSendRecovery} /></AuthLinkText>
      :<AuthLink style={{marginTop: 15}} onPress={handleVerify}>
        <AuthLinkText theme={theme}>{locale.verify.verify_button.text}</AuthLinkText>
      </AuthLink>}
      <View style={{marginTop: 20, alignItems: 'center', justifyContent: 'center'}}>
        <AuthButton
          theme={theme}
          style={shadow}
          onPress={handleContinue}
        >
          {loading ?
            <ActivityIndicator size="small" color={theme.background} />
            :
            <TxtButton>{locale.verify.continue_button.text}</TxtButton>
          }
        </AuthButton>
      </View>
    </View>
  );
};

export default Form;
