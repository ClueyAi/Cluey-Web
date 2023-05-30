import React from 'react';
import PropTypes from "prop-types";

import { Container } from '../../../components/styles';

import People from './People';
import Talks from './Talks';

const Menu = ({navigation}) => {

  return (
    <Container>
      <Talks navigation={navigation}/>
      <People navigation={navigation}/>
    </Container>
  );
};

Menu.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Menu;