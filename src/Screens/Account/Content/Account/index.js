import React, { useContext, useState, useEffect } from 'react';
import { parse, differenceInDays } from 'date-fns';
import UserAvatar from "react-native-user-avatar";
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocaleContext } from '/src/components/locale';
import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import {
  AccountButton,
  ContentAccount,
  ContentAccountProfile,
  ContentAccountSection,
  ContentAccountTextInput,
  ContentAccountTitle,
  ContentEditHeader,
  ContentEditHeaderButton,
  ContentAccountText,
  ContentAccountButtonText,
  ContentAccountValue
} from '../../../components';

const Account = () => {
  const {locale} = useContext(LocaleContext);
  const {user, updateUserName, updateDisplayName} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);
  const [edit, setEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [userName, setUserName] = useState('');

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDisplayName = (value) => {
    setDisplayName(value);
  };

  const handleUserName = (value) => {
    setUserName(value);
  };

  const handleSave = async () => {
    if (userName === user?.userName || userName === '' || userName.length < 3 || userName.length > 20 || userName.includes(' ')) {
      try {
        await updateUserName(user?.userName);
        handleEdit();
      } catch (error) {
        console.log(error);
      }
      return;
    } else {
      try {
        await updateUserName(userName);
        handleEdit();
      } catch (error) {
        console.log(error);
      }
    }
    if (displayName === user?.displayName || displayName === '' || displayName.length < 3 || displayName.length > 40) {
      try {
        await updateDisplayName(user?.displayName);
        handleEdit();
      } catch (error) {
        console.log(error);
      }
      return;
    } else {
      try {
        await updateDisplayName(displayName);
        handleEdit();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePassword = () => {
    console.log('password');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  useEffect(() => {
    setDisplayName(user?.displayName);
    if (user?.lastNameDate) {
      const revisedName = user?.userName.replace(/^@/g, '');
      setUserName(revisedName);
      const currentDate = new Date().toLocaleString();
      const lastDate = user?.lastNameDate;
      const dateFormat = 'dd/MM/yyyy, HH:mm:ss';
      const date1 = parse(currentDate, dateFormat, new Date());
      const date2 = parse(lastDate, dateFormat, new Date());
      const difference = differenceInDays(date1, date2);
      if (difference > 30) {
        setCanEdit(true);
      }
    }
  }, [user]);

  return (
    <ContentAccount>
      <ContentAccountProfile>
        <ContentAccountTitle theme={theme}>{locale.account.profile.title}</ContentAccountTitle>
        {edit ?
          <ContentEditHeader theme={theme}>
            <ContentEditHeaderButton theme={theme} onPress={handleEdit}>
              <ContentAccountValue>Cancel</ContentAccountValue>
            </ContentEditHeaderButton>
            <ContentEditHeaderButton theme={theme} onPress={handleSave}>
              <ContentAccountValue>Guardar</ContentAccountValue>
            </ContentEditHeaderButton>
          </ContentEditHeader>
          :
          <AccountButton onPress={handleEdit}>
            <Ionicons name="create-outline" size={26} color={theme.textDark} />
          </AccountButton>
        }
      </ContentAccountProfile>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.profile.photo}</ContentAccountText>
        <UserAvatar
          size={45}
          style={{ width: 45, height: 45, borderRadius: 100 }}
          name={user?.displayName}
          src={user?.photoURL}
        />
      </ContentAccountSection>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.profile.name}</ContentAccountText>
        {edit ? <ContentAccountTextInput
          theme={theme}
          placeholder={displayName}
          value={displayName}
          placeholderTextColor={theme.primary}
          selectionColor={theme.primary}
          selectTextOnFocus
          onChangeText={handleDisplayName}
        />:
          <ContentAccountValue theme={theme}>{user?.displayName}</ContentAccountValue>}
      </ContentAccountSection>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.profile.email}</ContentAccountText>
        <ContentAccountValue theme={theme}>{user?.email}</ContentAccountValue>
      </ContentAccountSection>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.profile.user_name}</ContentAccountText>
        {edit ? <ContentAccountTextInput
          theme={theme}
          placeholder={userName}
          value={userName}
          disabled={!canEdit}
          placeholderTextColor={theme.primary}
          selectionColor={theme.primary}
          selectTextOnFocus
          onChangeText={handleUserName}
        />:
          <ContentAccountValue theme={theme}>{user?.userName}</ContentAccountValue>}
      </ContentAccountSection>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.profile.uid}</ContentAccountText>
        <ContentAccountValue theme={theme}>{user?.uid}</ContentAccountValue>
      </ContentAccountSection>
      <ContentAccountProfile>
        <ContentAccountTitle theme={theme}>{locale.account.security.title}</ContentAccountTitle>
      </ContentAccountProfile>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.security.password.title}</ContentAccountText>
        <AccountButton onPress={handlePassword}>
          <ContentAccountButtonText color="password" theme={theme}>{locale.account.security.password.button}</ContentAccountButtonText>
        </AccountButton>
      </ContentAccountSection>
      <ContentAccountSection theme={theme}>
        <ContentAccountText theme={theme}>{locale.account.security.delete.title}</ContentAccountText>
        <AccountButton onPress={handleDelete}>
          <ContentAccountButtonText color="delete" theme={theme}>{locale.account.security.delete.button}</ContentAccountButtonText>
        </AccountButton>
      </ContentAccountSection>
    </ContentAccount>
  );
};

export default Account;