import React, {useContext} from 'react';
import PropTypes from "prop-types";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from '../../../../components/theme'
import { FirebaseContext } from '../../../../api/firebase'

import { 
  HeaderMenuContainer,
  HeaderInforSection,
  HeaderInfor,
  HeaderButtonSection,
  HeaderButton,
  HeaderDisplayName,
  HeaderUserName
} from '../../../components';

const Header = ({ selected, handleSelected }) => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(FirebaseContext);

  const getColor = (index) => {
    if (selected === index) {
      return theme.primary;
    } else {
      return theme.text;
    }
  };

  return (
    <HeaderMenuContainer theme={theme}>
      <HeaderInforSection onPress={() => handleSelected(9)}>
        <HeaderInfor theme={theme}>
          <HeaderDisplayName style={{color: getColor(9)}}>{user?.displayName}</HeaderDisplayName>
          <HeaderUserName style={{color: getColor(9)}} theme={theme}>{user?.userName}</HeaderUserName>
        </HeaderInfor>
      </HeaderInforSection>
      <HeaderButtonSection>
        <HeaderButton onPress={() => handleSelected(0)}>
          <AntDesign name="contacts" size={24} color={getColor(0)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(1)}>
          <AntDesign name="message1" size={24} color={getColor(1)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(2)}>
          <Ionicons name="book-outline" size={24} color={getColor(2)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(3)}>
          <AntDesign name="bars" size={24} color={getColor(3)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(4)}>
          <Ionicons name="color-wand-outline" size={24} color={getColor(4)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(5)}>
          <Ionicons name="ios-settings-outline" size={24} color={getColor(5)} />
        </HeaderButton>
      </HeaderButtonSection>
    </HeaderMenuContainer>
  );
};

Header.propTypes = {
  selected: PropTypes.number,
  handleSelected: PropTypes.func.isRequired
};

export default Header;