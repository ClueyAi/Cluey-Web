import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { FirebaseContext } from '../../../api/firebase';
import { Container } from '../../../components/styles';

import Messages from './Messages';
import New from './New';

const Talk = ({ navigation, route }) => {
  const { whisps, getWhisps } = useContext(FirebaseContext);
  const { id, email } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        getWhisps(id);
      } catch (error) {
        console.error(error);
      }
    });
  
    return unsubscribe;
  }, [navigation, id]);

  return (
    <Container>
      <Messages whisps={whisps} navigation={navigation} />
      <New talkId={id} friendEmail={email} />
    </Container>
  );
};

Talk.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Talk;
