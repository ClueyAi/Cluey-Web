import React, { useContext } from 'react'

import {
  AccountContent,
  AccountScrollView,
} from '../../components';

import Account from './Account';
import Invoicing from './Invoicing';
import Plans from './Plans';
import Notify from './Notify';

const Content = ({ selected }) => {
  return (
    <AccountContent>
      <AccountScrollView>
        {selected === 0 ? 
          <Account />
        :selected === 1 ? 
          <Invoicing />
        :selected === 2 ? 
          <Plans />
        :selected === 3 ? 
          <Notify />
        :null}
      </AccountScrollView>
    </AccountContent>
  );
};

export default Content;