import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { FirebaseContext } from '../../../api/firebase';
import { Container } from '../../../components/styles';

import Chats from './Chats';
import New from './New';

const Home = ({navigation}) => {
  const {appStatus} = useContext(FirebaseContext);

  const status = appStatus?.server;

  if (!status) {
    return (
      <Container>
        <Chats navigation={navigation} />
      </Container>
    );
  }

  return (
    <Container>
      <Chats navigation={navigation} />
      <New navigation={navigation}/>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Home;