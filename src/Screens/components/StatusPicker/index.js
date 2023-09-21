import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { FirebaseContext } from '/src/api/firebase';
import { ThemeContext } from '/src/components/theme';
import { LocaleContext } from '/src/components/locale';

import {
  StatusPickerContainer,
  StatusPickerButton,
  StatusPickerText,
  StatusPickerState
} from '..'

const StatusPicker = ({setVStatus }) => {
  const { user, ChangeStatus } = useContext(FirebaseContext);
  const {locale} = useContext(LocaleContext);
  const {theme} = useContext(ThemeContext);
  
  const handleVisible = () => {
    setVStatus(false);
  }
  const handleStatusChange = (status) => {
    ChangeStatus(status);
    handleVisible(false);
  };

  const options = [
    { id: 1, name: locale.status.online, status: 'online', color: theme.secondary },
    { id: 2, name: locale.status.away, status: 'away', color: theme.primary},
    { id: 3, name: locale.status.busy, status: 'busy', color: theme.error},
    { id: 4, name: locale.status.offline, status: 'offline', color: theme.textGray},
  ];

  return (
    <StatusPickerContainer theme={theme} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      {options.map((option) => (
        <StatusPickerButton
          key={option.id}
          theme={theme}
          style={user?.status === option.status?{borderColor:theme.primary}:{borderColor:theme.border}}
          onPress={() => handleStatusChange(option.status)}
        >
          <StatusPickerState style={{backgroundColor: option.color}}/>
          <StatusPickerText theme={theme}>{option.name}</StatusPickerText>
        </StatusPickerButton>
      ))}
    </StatusPickerContainer>
  );
};

StatusPicker.propTypes = {
  setVStatus: PropTypes.func
};

export default StatusPicker;