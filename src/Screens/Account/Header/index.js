import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext} from '../../../components/theme'

import {
  AccountHeader,
} from '../../components';

import Top from './Top';
import Nav from './Nav';

const Header = ({ selected, handleSelected }) => {
  const {theme} = useContext(ThemeContext);

  return (
    <AccountHeader theme={theme}>
      <Top />
      <Nav selected={selected} handleSelected={handleSelected} />
    </AccountHeader>
  );
};

Header.propTypes = {
  selected: PropTypes.number,
  handleSelected: PropTypes.func,
};

export default Header;