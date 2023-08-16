import React, { useContext } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemeContext } from '/src/components/theme';
import { FirebaseContext } from '/src/api/firebase';

import { CountContainer, CountContent, CountTitles } from '../../../../components';

const Count = () => {
  const { user } = useContext(FirebaseContext);
  const { theme } = useContext(ThemeContext);

  const getColor = () => {
    if (user?.credits >= 1000) {
      return theme.secondary;
    } else if (user?.credits >= 300) {
      return theme.primary;
    } else {
      return theme.error;
    }
  };

  return (
    <CountContainer>
      <CountContent>
        <Ionicons name="bulb-outline" size={24} color={getColor()} />
        <CountTitles theme={theme} style={{color: getColor()}}>{user?.credits}</CountTitles>
      </CountContent>
    </CountContainer>
  );
};

export default Count;