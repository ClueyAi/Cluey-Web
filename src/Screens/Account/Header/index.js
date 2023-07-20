import React from 'react';

import {
  AccountHeader,
} from '../../components';

import Top from './Top';
import Nav from './Nav';

const Header = ({ selected, handleSelected }) => {

  return (
    <AccountHeader>
      <Top />
      <Nav selected={selected} handleSelected={handleSelected} />
    </AccountHeader>
  );
};

export default Header;