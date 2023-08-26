import React, { useState, useContext } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LocaleContext } from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';

import { ContactContainer, ContactButtons, ContactButtonAdd, AddContainer, AddText } from '../../../../components';

import People from './People';
import Direct from './Direct';

const Menu = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [addContact, setAddContact] = useState(false);
  const [addGroup, setAddGroup] = useState(false);

  const handlerAddContact = () => {
    setAddContact(true);
  };

  const handlerAddGroup = () => {
    setAddGroup(true);
  };

  const handlerClose = () => {
    setAddGroup(false);
    setAddContact(false);
  };


  if (addContact) {
    return (
      <ContactContainer>
        <AddContainer>
          <AddText theme={theme}>{locale.directs.item.title}</AddText>
          <ContactButtonAdd onPress={handlerClose}>
            <MaterialIcons name="close" size={24} color={theme.text} />
          </ContactButtonAdd>
        </AddContainer>
        <People handlerAddContact={handlerAddContact} />
      </ContactContainer>
    );
  }

  if (addGroup) {
    return (
      <ContactContainer>
        <AddContainer>
          <AddText theme={theme}>{locale.directs.item.title}</AddText>
          <ContactButtonAdd onPress={handlerClose}>
            <MaterialIcons name="close" size={24} color={theme.text} />
          </ContactButtonAdd>
        </AddContainer>
        <People handlerAddContact={handlerAddContact} />
      </ContactContainer>
    );
  }

  if (!addContact) {
    return (
      <ContactContainer>
        <AddContainer>
          <AddText theme={theme}>{locale.directs.item.title}</AddText>
          <ContactButtons>
            <ContactButtonAdd onPress={handlerAddGroup}>
              <AntDesign name="addusergroup" size={22} color={theme.text} />
            </ContactButtonAdd>
            <ContactButtonAdd onPress={handlerAddContact}>
              <MaterialIcons name="add" size={22} color={theme.text} />
            </ContactButtonAdd>
          </ContactButtons>
        </AddContainer>
        <Direct />
      </ContactContainer>
    );
  }
};

export default Menu;