import React, {useContext} from 'react';
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemeContext } from '../../../../components/theme'

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
        <AntDesign name="contacts" size={26} color={getColor(0)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(1)}>
        <AntDesign name="message1" size={26} color={getColor(1)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(2)}>
        <AntDesign name="book" size={26} color={getColor(2)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(3)}>
        <AntDesign name="bars" size={26} color={getColor(3)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(4)}>
        <AntDesign name="rest" size={26} color={getColor(4)} />
      </NavItensButton>
      <NavItensButton onPress={() => handleNavOption(5)}>
        <AntDesign name="setting" size={26} color={getColor(5)} />
      </NavItensButton>
    </NavContainer>
  );
};

export default Nav;