import React, { createContext, useState } from 'react';
import PropTypes from "prop-types";

import light from './light';
import dark  from './dark';
import shadow from './shadow';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(light);

  const toggleTheme = (item) => {
    setTheme(item?light:dark);
  };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { light, dark, shadow }

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};