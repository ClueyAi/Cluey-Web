import React, {useContext} from 'react';
import PropTypes from "prop-types";
import { ThemeContext } from '../../../../components/theme';
import { FirebaseContext } from '../../../../api/firebase';
import Icons from '/src/api/3gs-icons/src';

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
          <Icons name='address-book' size={28} color={getColor(0)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(1)}>
          <Icons name="cluey" size={28} color={getColor(1)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(2)}>
          <Icons name="book" size={28} color={getColor(2)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(3)}>
          <Icons name="list-checkbox" size={28} color={getColor(3)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(4)}>
          <Icons name="magic-wand" size={28} color={getColor(4)} />
        </HeaderButton>
        <HeaderButton onPress={() => handleSelected(5)}>
          <Icons name="settings" size={28} color={getColor(5)} />
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