import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { FirebaseContext } from '../../../../api/firebase';
import { ThemeContext, shadow } from '../../../../components/theme';
import { ButtonEmpyte } from '../../../../components/styles';

import Person from './Person';
import New from './New';

const People = ({navigation}) => {
  const {contacts, putContact, createTalk} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);

  const handlerChat = async (item) => {
    try {
      createTalk(item?.id).then((talk) => {
        if (talk != null) {
          navigation.navigate('Talk', {id: talk, email: item?.id});
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      data={contacts}
      style={{width: '100%', paddingTop: 5, paddingBottom: 40}}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ButtonEmpyte 
          style={{
            ...shadow,
            alignSelf: 'center',
            width: '95%',
            marginTop: 5,
            marginBottom: 5,
            borderRadius: 20,
            paddingHorizontal: 10,
            backgroundColor: theme.background
          }} 
          onPress={() => handlerChat(item)}
        >
          <Person item={item}/>
        </ButtonEmpyte>
      )}
      ListHeaderComponent={<New putContact={putContact}/>}
    />
  );
};

People.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default People;