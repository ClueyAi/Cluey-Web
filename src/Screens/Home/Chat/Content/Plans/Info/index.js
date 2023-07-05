import React from 'react';

import { PlansInfoContent, PlansInfoImage } from '../../../../../components';

const Info = () => {

  return (
    <PlansInfoContent>
      <PlansInfoImage source={require('../../../../../../../assets/images/plans.png')} />
    </PlansInfoContent>
  );
};

export default Info;