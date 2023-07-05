import React from 'react';
import PropTypes from "prop-types";

import { ChatsContainer } from '../../../components';

import Chats from './Chats';
import Contacts from './Contacts';
import User from './User';
import Settings from './Settings';

import Working from '../../../Utils/Working';
const Content = ({selected, handleSelected}) => {
  if (selected === 0) {
    return (
      <ChatsContainer>
        <Contacts />
      </ChatsContainer>
    );
  } else if (selected === 1) {
    return (
      <ChatsContainer>
        <Chats />
      </ChatsContainer>
    );
  } else if (selected === 2) {
    return (
      <ChatsContainer>
        <Working />
      </ChatsContainer>
    );
  } else if (selected === 3) {
    return (
      <ChatsContainer>
        <Working />
      </ChatsContainer>
    );
  } else if (selected === 4) {
    return (
      <ChatsContainer>
        <Working />
      </ChatsContainer>
    );
  } else if (selected === 5) {
    return (
      <ChatsContainer>
        <Settings handleSelected={handleSelected}/>
      </ChatsContainer>
    );
  } else if (selected === 9) {
    return (
      <ChatsContainer>
        <User />
      </ChatsContainer>
    );
  }
};

Content.propTypes = {
  selected: PropTypes.number,
};

export default Content;