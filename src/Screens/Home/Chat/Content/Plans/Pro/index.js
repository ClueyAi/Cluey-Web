import React, { useContext } from 'react';
import { LocaleContext } from '../../../../../../components/locale';
import { ThemeContext, shadow } from '../../../../../../components/theme';

import { PlansPro, PlansHeader, PlansTitle, PlansDescription, PlansPriceSetion, PlansPriceSpan, PlansPriceValue, PlansPriceDetail, PlansButton, PlansButtonText, PlansInfo } from '../../../../../components';
import { hover } from '../../../../../functions';


const Pro = () => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = hover();
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);

  const handlePlans = () => {
    window.open('https://cluey.webflow.io/#planos');
  };

  return (
    <PlansPro theme={theme} >
      <PlansHeader>
        <PlansTitle theme={theme}>Colaborativo</PlansTitle>
        <PlansDescription theme={theme}>Ideal para empresas e grupos. Experiência Cluey sem restrições e com suporte personalizado.</PlansDescription>
      </PlansHeader>
      <PlansPriceSetion style={{marginTop: 10}}>
        <PlansPriceDetail theme={theme}>$</PlansPriceDetail>
        <PlansPriceSpan>
          <PlansPriceValue theme={theme}>19,99</PlansPriceValue>
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
      <PlansInfo theme={theme}>Teste gratuitamente durante 30 dias</PlansInfo>
    </PlansPro>
  );
};

export default Pro;