import React, { useState, useContext } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LocaleContext } from '../../../../../components/locale';
import { ThemeContext } from '../../../../../components/theme';

import { ContactContainer, ContactButtonAdd, AddContainer, AddText } from '../../../../components';

import People from './People';
import Direct from './Direct';

const Menu = () => {
  const { locale } = useContext(LocaleContext);
  const { theme } = useContext(ThemeContext);
  const [addContact, setAddContact] = useState(false);

  const handlerAddContact = () => {
    if (addContact) {
      setAddContact(false);
    } else {
      setAddContact(true);
    }
  };

  if (addContact) {
    return (
      <ContactContainer>
        <ContactButtonAdd onPress={handlerAddContact}>
          <AddContainer>
            <AddText>{locale.directs.item.title}</AddText>
            <MaterialIcons name="close" size={22} color={theme.text} />
          </AddContainer>
        </ContactButtonAdd>
        <People handlerAddContact={handlerAddContact} />
      </ContactContainer>
    );
  }

  if (!addContact) {
    return (
      <ContactContainer>
        <ContactButtonAdd onPress={handlerAddContact}>
          <AddContainer>
            <AddText>{locale.directs.item.title}</AddText>
            <MaterialIcons name="add" size={22} color={theme.text} />
          </AddContainer>
        </ContactButtonAdd>
        <Direct />
      </ContactContainer>
    );
  }
};

export default Menu;