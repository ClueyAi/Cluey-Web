import React from 'react';
import PropTypes from 'prop-types';

const AddressBook = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.6772 15.4176C24.5344 15.4176 26.8507 13.0312 26.8507 10.0874C26.8507 7.14362 24.5344 4.7572 21.6772 4.7572C18.82 4.7572 16.5038 7.14362 16.5038 10.0874C16.5038 13.0312 18.82 15.4176 21.6772 15.4176Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M32.0243 29.6526C32.0243 23.765 27.3919 18.9922 21.6775 18.9922C15.963 18.9922 11.3306 23.765 11.3306 29.6526" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.81438 17.9091C12.2551 17.9091 14.2337 15.8705 14.2337 13.3558C14.2337 10.8411 12.2551 8.80249 9.81438 8.80249C7.37364 8.80249 5.39502 10.8411 5.39502 13.3558C5.39502 15.8705 7.37364 17.9091 9.81438 17.9091Z" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.81444 21.1362C4.93292 21.1362 0.975708 25.2134 0.975708 30.2428" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

AddressBook.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default AddressBook;
