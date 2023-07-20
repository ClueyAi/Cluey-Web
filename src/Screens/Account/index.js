import React, { useState, useEffect } from 'react';

import {
  AccountContainer,
} from '../components'

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Account = () => {
  const [selected, setSelected] = useState(0);

  const handleSelected = (item) => {
    setSelected(item);
  };

  useEffect(() => {
    setSelected(selected? selected: 0);
  }, [selected]);

  return (
    <AccountContainer>
      <Header selected={selected} handleSelected={handleSelected} />
      <Content selected={selected} />
      <Footer />
    </AccountContainer>
  );
};

export default Account;