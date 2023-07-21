import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  ContentContainer,
} from '../../components'

import News from '../News';
import Login from './Login';
import Register from './Register';
import Forgot from './Forgot';
import Verify from './Verify';
import Footer from './Footer';

const Content = () => {
  const location = useLocation();
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const loadScreen = () => {
      setScreen(location.state?.route==='Login'?
        0: location.state?.route==='Register'?
          1: location.state?.route==='Forgot'?
            2: location.state?.route==='Verify'?
              3: 0
      );
    };
    loadScreen();
  }, [location]);

  return (
    <ContentContainer>
      {(() => {
        switch (screen) {
        case 0:
          return <Login />;
        case 1:
          return <Register />;
        case 2:
          return <Forgot />;
        case 3:
          return <Verify />;
        default:
          return null;
        }
      })()}
      <Footer />
    </ContentContainer>
  );
};

export default Content;