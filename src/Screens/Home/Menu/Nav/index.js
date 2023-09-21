import React, {useContext} from 'react';
import PropTypes from "prop-types";
import { ThemeContext } from '/src/components/theme';
import Icons from '/src/api/3gs-icons/src';

import {
  NavContainer,
  NavButton,
  NavItensButton,
} from '../../../components';

import Hamburguer from './Hamburguer';

const Nav = ({ handlerMenu, isOpen, setIsOpen, selected, handleSelected }) => {
  const {theme} = useContext(ThemeContext);

  const getColor = (index) => {
    if (selected === index && isOpen) {
      return theme.primary;
    } else {
      return theme.text;
    }
  };

  const handleNavButton = (item) => {
    handlerMenu();
    handleSelected(item);
  }
  const handleNavOption = (item) => {
    setIsOpen(true);
    handleSelected(item);
  }

  return (
    <NavContainer>
      <NavButton theme={theme} onPress={() => handleNavButton(0)}>
        <Hamburguer />
      </NavButton>
      <NavItensButton onPress={() => handleNavOption(0)}>
        <Icons name='address-book' size={28} color={getColor(0)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(1)}>
        <Icons name="cluey" size={28} color={getColor(1)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(2)}>
        <Icons name="book" size={28} color={getColor(2)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(3)}>
        <Icons name="list-checkbox" size={28} color={getColor(3)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(4)}>
        <Icons name="magic-wand" size={28} color={getColor(4)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(5)}>
        <Icons name="settings" size={28} color={getColor(5)} />
      </NavItensButton>
    </NavContainer>
  );
};

Nav.propTypes = {
  handlerMenu: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  selected: PropTypes.number,
  handleSelected: PropTypes.func
};

export default Nav;