import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FirebaseContext } from '../../../api/firebase';
import { Container } from '../../../components/global';

import Messages from './Messages';
import New from './New';

const Talk = ({ navigation, route }) => {
  const { talk } = useContext(FirebaseContext);
  const { id, email } = route.params;

  return (
    <Container>
      <Messages talk={talk} navigation={navigation} />
      <New talkId={id} friendEmail={email} />
    </Container>
  );
};

Talk.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Talk;
