import React from 'react';
import PropTypes from 'prop-types';

import AddressBook from './icons/address-book';
import Book from './icons/Book';
import ListCheckbox from './icons/list-checkbox';
import Cluey from './icons/cluey';
import MagicWand from './icons/magic-wand';
import Settings from './icons/settings';

const Icons = ({name, size, color}) => {
  if (name === 'address-book')
    return (
      <AddressBook size={size} color={color} />
    )
  if (name === 'book')
    return (
      <Book size={size} color={color} />
    )
  if (name === 'list-checkbox')
    return (
      <ListCheckbox size={size} color={color} />
    )
  if (name === 'cluey')
    return (
      <Cluey size={size} color={color} />
    )
  if (name === 'magic-wand')
    return (
      <MagicWand size={size} color={color} />
    )
  if (name === 'settings')
    return (
      <Settings size={size} color={color} />
    )

  return;
};

Icons.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string
};

export default Icons;