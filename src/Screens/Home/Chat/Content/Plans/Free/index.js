import React, { useContext } from 'react';
import { ThemeContext, shadow } from '/src/components/theme';

import { PlansFree, PlansHeader, PlansTitle, PlansDescription, PlansPriceSetion, PlansPriceSpan, PlansPriceValue, PlansPriceDetail, PlansButton, PlansButtonText, PlansInfo } from '../../../../../components';
import { hover } from '../../../../../functions';

const Free = () => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = hover();
  const {theme} = useContext(ThemeContext);

  const handlePlans = () => {
    window.open('https://cluey.webflow.io/#planos');
  };

  return (
    <PlansFree theme={theme} >
      <PlansHeader>
        <PlansTitle theme={theme}>Grátis</PlansTitle>
        <PlansDescription theme={theme}>Versão grátis do Cluey. Contém limitações.</PlansDescription>
      </PlansHeader>
      <PlansPriceSetion style={{marginTop: 30}}>
        <PlansPriceDetail theme={theme}>$</PlansPriceDetail>
        <PlansPriceSpan>
          <PlansPriceValue theme={theme}>0,00</PlansPriceValue>
          <PlansPriceDetail theme={theme}>/mês</PlansPriceDetail>
        </PlansPriceSpan>
      </PlansPriceSetion>
      <PlansButton
        theme={theme}
        style={{...isHovered? shadow: null, marginBottom: 20, marginTop: 20}}
        isHovered={isHovered}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPress={handlePlans}
      >
        <PlansButtonText
          theme={theme}
          isHovered={isHovered}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >Saber mais</PlansButtonText>
      </PlansButton>
      <PlansInfo theme={theme}>Use gratuitamente para sempre</PlansInfo>
    </PlansFree>
  );
};

export default Free;