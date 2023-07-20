import React, { useContext } from 'react';
import { ThemeContext } from '/src/components/theme';
import { FirebaseContext } from '/src/api/firebase';

import { CountContainer, CountTitles } from '../../../../components';

const Header = () => {
  const { user } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);

  return (
    <CountContainer>
      <CountTitles theme={theme}>{user?.credits}</CountTitles>
    </CountContainer>
  );
};

export default Header;