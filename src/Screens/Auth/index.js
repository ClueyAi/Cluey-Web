import React from 'react';

import {
  AuthContainer,
} from '../components'

import News from './News';
import Content from './Content';

const Auth = () => {
  return (
    <AuthContainer>
      <News />
      <Content />
    </AuthContainer>
  );
};

export default Auth;