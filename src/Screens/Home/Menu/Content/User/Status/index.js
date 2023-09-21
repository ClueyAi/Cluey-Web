import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from "prop-types";

import { ThemeContext } from "/src/components/theme";

import {
  UserClose,
  StatusPicker,
  StatusContainer
} from '../../../../../components';

const Status = ({ setVStatus }) => {
  const { theme } = useContext(ThemeContext);

  const handleClose = () => {
    setVStatus(false);
  };

  return (
    <StatusContainer>
      <UserClose onPress={handleClose}>
        <Ionicons name="chevron-back" size={24} color={theme.textDark}/>
      </UserClose>
      <StatusPicker setVStatus={setVStatus}/>
    </StatusContainer>
  );
};

Status.propTypes = {
  setVStatus: PropTypes.func,
};

export default Status;
