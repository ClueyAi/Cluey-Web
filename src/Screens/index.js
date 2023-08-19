import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocaleContext } from '../components/locale';

import Home from './Home';
import Auth from './Auth';
import Account from './Account';
import Rules from './Utils/Rules';
import About from './Utils/About';
import NotFound from './Utils/NotFound';
//import Preferences from './Utils/Preferences';
//import About from './Utils/About';

const Screens = () => {
  const {locale} = useContext(LocaleContext);

  useEffect(() => {
    document.title = locale.global.app.name;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/rules" element={<Rules/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </Router>
  );
};

export default Screens;
