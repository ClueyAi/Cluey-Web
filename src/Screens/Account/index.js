import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '/src/api/firebase';

import {
  AccountContainer,
} from '../components';
import { navigate } from '../functions';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Account = () => {
  const { isAuth } = useContext(FirebaseContext);
  const [selected, setSelected] = useState(0);

  const {goTo} = navigate();

  const handleSelected = (item) => {
    setSelected(item);
  };
  /*
  useEffect(() => {
    const isLoged = async () => {
      if (!isAuth) {
        goTo('/auth');
      } 
    }

    isLoged();
  }, [isAuth]);*/

  return (
    <AccountContainer>
      <Header selected={selected} handleSelected={handleSelected} />
      <Content selected={selected} />
      <Footer />
    </AccountContainer>
  );
};

export default Account;