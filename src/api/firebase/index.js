import React from 'react';
import PropTypes from "prop-types";

import { UserProvider, UserContext } from './user';
import { FirestoreProvider, FirestoreContext } from './firestore';

export {  UserContext, FirestoreContext };

export const Firebase = ({ children }) => {
  return (
    <UserProvider>
      <FirestoreProvider>
        {children}
      </FirestoreProvider>
    </UserProvider>
  );
};

Firebase.propTypes = {
  children: PropTypes.node.isRequired
};