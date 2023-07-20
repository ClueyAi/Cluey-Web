import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { FirebaseContext } from '/src/api/firebase';
import { LocaleContext } from '/src/components/locale'
import { ThemeContext, shadow } from '/src/components/theme';

import {
  PeopleContainer,
  PeopleContent,
  Button,
  PeopleInput,
  PeopleTextInput,
  PeopleResult,
  PeopleSection,
  PeopleAction,
  PeopleButton,
  PeopleText,
  AlertBox
} from "../../../../../components";
import { navigate, hover } from '../../../../../functions';

import Search from './Search';
import Person from './Person';

const People = ({handlerAddContact}) => {
  const {user, contacts, contactsSearch, putContact, searchContacts, deleteContact, createDirectUserChat, createDirectFriendChat} = useContext(FirebaseContext);
  const { locale } = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  const [contactEmail, setContactEmail] = useState('');
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [exceptions, setExceptions] = useState(null);

  const {goTo} = navigate();

  const handlerContactSearch = (text) => {
    setContactEmail(text);
  };

  useEffect(() => {
    searchContacts(contactEmail);
    if (contacts) {
      setExceptions([user?.uid, ...contacts.map((contact) => contact.uid)]);
    } else {
      setExceptions([user?.uid]);
    }
  }, [contactEmail, user, contacts]);

  const handlerDeleteContact = (item) => {
    const options = {
      message1: locale.alert.delete_contact.message1,
      message2: locale.alert.delete_contact.message2,
      name: item.displayName,
      onConfirm: async () => {
        try {
          await deleteContact(item.uid)
        } catch (error) {
          alert(error);
        }
        setVisible(false);
      },
      messageConfirm: locale.alert.yes,
      onCancel: () => {
        setVisible(false);
      },
      messageCancel: locale.alert.no
    };
    setData(options);
    setVisible(true);
  };

  const handleAddNewContact = async (item) => {
    try {
      await putContact(item);
      setContactEmail('');
    } catch (error) {
      console.error(error);
    }
  };

  const handlerChat = async (item) => {
    try {
      createDirectUserChat(item?.uid).then((chatID) => {
        createDirectFriendChat(item?.uid, chatID);
        goTo('/', {state: {id: chatID}});
        handlerAddContact();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const SearchItem = ({item}) => {
    const { isHovered, handleMouseEnter, handleMouseLeave } = hover();
    if (exceptions && !exceptions.includes(item.uid)) {
      return (
        <PeopleSection>
          <Search item={item}/>
          <PeopleAction>
            <PeopleButton
              style={isHovered? shadow: null}
              theme={theme}
              onPress={() => handlerChat(item)}
              isHovered={isHovered}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <PeopleText theme={theme}>{locale.people.button.text}</PeopleText>
            </PeopleButton>
            <Button onPress={() => handleAddNewContact(item)}>
              <MaterialIcons name="add" size={22} color={theme.text} />
            </Button>
          </PeopleAction>
        </PeopleSection>
      );
    }
    return null;
  };

  SearchItem.propTypes = {
    item: PropTypes.object,
  };

  const PersonItem = ({item}) => {
    const { isHovered, handleMouseEnter, handleMouseLeave } = hover();

    return (
      <PeopleSection>
        <Person item={item}/>
        <PeopleAction>
          <PeopleButton
            style={isHovered? shadow: null}
            theme={theme}
            onPress={() => handlerChat(item)}
            isHovered={isHovered}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <PeopleText theme={theme}>{locale.people.button.text}</PeopleText>
          </PeopleButton>
          <Button onPress={() => handlerDeleteContact(item)}>
            <MaterialIcons name="delete-outline" size={22} color={theme.error} />
          </Button>
        </PeopleAction>
      </PeopleSection>
    );
  };

  PersonItem.propTypes = {
    item: PropTypes.object,
  };

  return (
    <PeopleContainer>
      {visible?<AlertBox data={data} />:null}
      <PeopleContent>
        <PeopleInput style={shadow} theme={theme}>
          <PeopleTextInput
            placeholder={locale.directs.item.input.placeholder}
            placeholderTextColor={theme.textDark}
            theme={theme}
            value={contactEmail}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus={true}
            maxLength={100}
            hitKey="done"
            onChangeText={handlerContactSearch}
            onSubmitEditing={() => setContactEmail(contactEmail)}
          />
          <Button onPress={() => setContactEmail(contactEmail)}>
            <MaterialIcons style={{marginRight: 15}} name="search" size={22} color={theme.text} />
          </Button>
        </PeopleInput>
        <PeopleResult>
          <FlatList
            data={contactsSearch}
            style={{width: '100%'}}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => <SearchItem item={item}/>}
          />
        </PeopleResult>
        <FlatList
          data={contacts}
          style={{width: '100%'}}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => <PersonItem item={item}/>}
        />
      </PeopleContent>
    </PeopleContainer>
  );
};

People.propTypes = {
  handlerAddContact: PropTypes.func,
  item: PropTypes.object,
};

export default People;