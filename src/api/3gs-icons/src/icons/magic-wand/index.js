import React from 'react';
import PropTypes from 'prop-types';

const MagicWand = ({size, color}) => ( 
  <svg width={size} height={size} viewBox="0 0 34 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_858_7140)">
      <path d="M10.7119 17.4976L1.64703 26.4688L6.28433 31.1061L15.5238 22.0125M10.7119 17.4976L13.9199 14.1115L18.91 18.6589L15.5238 22.0125M10.7119 17.4976L15.5238 22.0125" stroke={color}strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.7616 5.2253H19.0385M16.9 3.02206V7.42853" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26.4659 7.42854H32.8812M29.6736 4.12369V10.7334" stroke={color}strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M28.6044 19.7032H32.8812M30.7428 17.5V21.9065" stroke={color}strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21.5931 13.3435H24.7297M23.1614 11.7277V14.9593" stroke={color}strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_858_7140">
        <rect width="33" height="34" fill="white" transform="translate(0.400024 0.5)"/>
      </clipPath>
    </defs>
  </svg>

);

MagicWand.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default MagicWand;
