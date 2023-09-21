import React, { useContext } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemeContext } from '/src/components/theme';

import { BackContainer, BackContent, BackButton } from '../../../../components';
import { navigate, hover } from '../../../../functions';

const Back = () => {
  const { theme } = useContext(ThemeContext);
  const { isHovered, handleMouseEnter, handleMouseLeave } = hover();
  const {goTo} = navigate();

  const handlerBack = () => {
    goTo('/', {state: {id: null}});
  }; 

  return (
    <BackContainer>
      <BackContent>
        <BackButton>
          <Ionicons 
            name="chevron-back" 
            size={30}
            color={isHovered? theme.primary: theme.textGray}
            isHovered={isHovered}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onPress={handlerBack}
          />
        </BackButton>
      </BackContent>
    </BackContainer>
  );
};

export default Back;