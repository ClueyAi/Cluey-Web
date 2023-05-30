import React, { useContext, useEffect } from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";

import { FirebaseContext } from '../../../../api/firebase';
import { ThemeContext, shadow } from '../../../../components/theme';
import { ButtonEmpyte } from '../../../../components/styles';

import Whisp from './Whisp';

const Talks = ({navigation}) => {
  const {getTalks, talks, createTalk} = useContext(FirebaseContext);
  const {theme} = useContext(ThemeContext);

  const handlerChat = async (item) => {
    try {
      createTalk(item?.profile.email).then((talk) => {
        if (talk != null) {
          navigation.navigate('Talk', {id: talk, email: item?.profile.email});
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        getTalks();
      } catch (error) {
        console.error(error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={talks}
      style={{width: '100%', paddingTop: 5, paddingBottom: 40}}
      keyExtractor={(item, index) => index.toString()}
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
          onPress={() => handlerChat(item.userData)}
        >
          <Whisp item={item} />
        </ButtonEmpyte>
      )}
    />
  );
};

Talks.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Talks;