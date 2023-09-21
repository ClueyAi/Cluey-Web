import React from 'react';

import { PlansContainer, PlansSection } from '../../../../components';

import Free from './Free';
import Personal from './Personal';
import Pro from './Pro';
import Info from './Info';

const Plans = () => {
  return (
    <PlansContainer>
      <PlansSection>
        <Free/>
        <Personal/>
        <Pro/>
      </PlansSection>
      <Info/>
    </PlansContainer>
  );
};

export default Plans;