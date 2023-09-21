import React from 'react';
import PropTypes from 'prop-types';

const ListCheckbox = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.25 17H30.75" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.25 25.9167H30.75" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.25 8.08334H30.75" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.75 23.0833H3.25V28.75H8.75V23.0833Z" stroke={color} strokeLinejoin="round"/>
    <path d="M8.75 14.1667H3.25V19.8333H8.75V14.1667Z" stroke={color} strokeLinejoin="round"/>
    <path d="M8.75 5.25H3.25V10.9167H8.75V5.25Z" stroke={color} strokeLinejoin="round"/>
  </svg>
);

ListCheckbox.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default ListCheckbox;
