import React from 'react';

import { SlidersContainer, SlidersInfoContent, SlidersInfoImage } from '../../../../components';

const Sliders = () => {
  return (
    <SlidersContainer>
      <SlidersInfoContent>
        <SlidersInfoImage source={require('../../../../../../assets/images/banner/b1.png')} />
      </SlidersInfoContent>
    </SlidersContainer>
  );
};

export default Sliders;