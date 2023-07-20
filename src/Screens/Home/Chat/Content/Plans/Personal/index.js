import React, { useContext } from 'react';
import { ThemeContext, shadow } from '/src/components/theme';

import { PlansPersonal, PlansHeader, PlansTitle, PlansDescription, PlansPriceSetion, PlansPriceSpan, PlansPriceValue, PlansPriceDetail, PlansButton, PlansButtonText, PlansInfo } from '../../../../../components';
import { hover } from '../../../../../functions';


const Personal = () => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = hover();
  const {theme} = useContext(ThemeContext);

  const handlePlans = () => {
    window.open('https://cluey.webflow.io/#planos');
  };

  return (
    <PlansPersonal theme={theme} >
      <PlansHeader>
        <PlansTitle theme={theme}>Pessoal</PlansTitle>
        <PlansDescription theme={theme}>Desbloqueie o seu potencial com ferramentas avançadas e recursos abrangentes.</PlansDescription>
      </PlansHeader>
      <PlansPriceSetion style={{marginTop: 10}}>
        <PlansPriceDetail theme={theme}>$</PlansPriceDetail>
        <PlansPriceSpan>
          <PlansPriceValue theme={theme}>9,99</PlansPriceValue>
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
      <PlansInfo theme={theme}>Test gratuitamente durante 14 dias</PlansInfo>
    </PlansPersonal>
  );
};

export default Personal;