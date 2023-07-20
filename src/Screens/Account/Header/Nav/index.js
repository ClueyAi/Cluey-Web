import React, { useContext } from 'react';
import PropTypes from "prop-types";

import { LocaleContext} from '/src/components/locale';
import { ThemeContext } from '/src/components/theme';

import {
  AccountNav,
  AccountNavSection,
  AccountNavTitle,
  AccountNavButton,
  AccountNavText
} from '../../../components';

const Nav = ({ selected, handleSelected }) => {
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const getColor = (index) => {
    if (selected === index) {
      return theme.primary;
    } else {
      return theme.transparent;
    }
  };

  return (
    <AccountNav theme={theme}>
      <AccountNavTitle theme={theme}>{locale.settings.title}</AccountNavTitle>
      <AccountNavSection>
        <AccountNavButton onPress={() => handleSelected(0)} color={getColor(0)}>
          <AccountNavText theme={theme}>{locale.settings.account.title}</AccountNavText>
        </AccountNavButton>
        <AccountNavButton onPress={() => handleSelected(1)} color={getColor(1)}>
          <AccountNavText theme={theme}>{locale.settings.invoicing.title}</AccountNavText>
        </AccountNavButton>
        <AccountNavButton onPress={() => handleSelected(2)} color={getColor(2)}>
          <AccountNavText theme={theme}>{locale.settings.plans.title}</AccountNavText>
        </AccountNavButton>
        <AccountNavButton onPress={() => handleSelected(3)} color={getColor(3)}>
          <AccountNavText theme={theme}>{locale.settings.notify.title}</AccountNavText>
        </AccountNavButton>
      </AccountNavSection>
    </AccountNav>
  );
};

Nav.propTypes = {
  selected: PropTypes.number,
  handleSelected: PropTypes.func
};

export default Nav;