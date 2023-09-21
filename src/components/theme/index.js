import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from "prop-types";

import { FirebaseContext } from "/src/api/firebase";

import light from './light';
import dark  from './dark';
import shadow from './shadow';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { user } = useContext(FirebaseContext);
  const [theme, setTheme] = useState(light);

  useEffect(() => {
    if (user) {
      if (user?.theme) {
        setTheme(dark);
      } else {
        setTheme(light);
      }
    } else {
      setTheme(light);
    }
  }, [user]);

  const toggleTheme = (item) => {
    setTheme(item?dark:light);
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