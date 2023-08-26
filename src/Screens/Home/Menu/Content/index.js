import React from 'react';
import PropTypes from "prop-types";

import { ChatsContentContainer } from '../../../components';

import Chats from './Chats';
import Contacts from './Contacts';
import User from './User';
import Settings from './Settings';

import Working from '../../../Utils/Working';
const Content = ({selected}) => {
  if (selected === 0) {
    return (
      <ChatsContentContainer>
        <Contacts />
      </ChatsContentContainer>
    );
  } else if (selected === 1) {
    return (
      <ChatsContentContainer>
        <Chats />
      </ChatsContentContainer>
    );
  } else if (selected === 2) {
    return (
      <ChatsContentContainer>
        <Working />
      </ChatsContentContainer>
    );
  } else if (selected === 3) {
    return (
      <ChatsContentContainer>
        <Working />
      </ChatsContentContainer>
    );
  } else if (selected === 4) {
    return (
      <ChatsContentContainer>
        <Working />
      </ChatsContentContainer>
    );
  } else if (selected === 5) {
    return (
      <ChatsContentContainer>
        <Settings />
      </ChatsContentContainer>
    );
  } else if (selected === 9) {
    return (
      <ChatsContentContainer>
        <User />
      </ChatsContentContainer>
    );
  }
};

Content.propTypes = {
  selected: PropTypes.number,
  handleSelected: PropTypes.func,
};

export default Content;