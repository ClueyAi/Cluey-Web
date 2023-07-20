import React from 'react';
import PropTypes from 'prop-types';

const Book = ({size, color}) => ( 
  <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.8959 28C10.639 23.2085 5.36494 25.0172 2.6881 26.6073C2.32063 26.8271 1.86563 26.8201 1.50498 26.589C1.14433 26.3575 0.936749 25.9403 0.96554 25.5039C1.29361 20.5009 2.01073 9.63455 2.07968 8.58812C2.08271 8.54206 2.11984 8.50654 2.16454 8.50654C2.16454 8.50654 8.6445 2.1214 16.9823 8.50654" stroke={color} strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.067 28C23.3238 23.2085 28.598 25.0172 31.2748 26.6073C31.6423 26.8271 32.0973 26.8201 32.4579 26.589C32.8186 26.3575 33.0261 25.9403 32.9974 25.5039C32.6522 20.2448 31.8775 8.50654 31.8775 8.50654H31.7983C31.7983 8.50654 25.3184 2.1214 16.9806 8.50654" stroke={color} strokeMiterlimit="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 15L14 15" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 18L14 18" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 15L27 15" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 18L29 18" stroke={color} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

Book.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};

export default Book;
