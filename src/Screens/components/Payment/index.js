import React, { useContext, useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { ThemeContext, shadow } from '/src/components/theme';

import {
  PatchContainer,
  PatchContent,
  PatchHeader,
  PatchTitle,
} from '..';

const Payment = ({ payment, setEditPayment }) => {
  const {theme} = useContext(ThemeContext);
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      setEditPayment(false);
    }, 500);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <PatchContainer>
          <PatchContent theme={theme} style={shadow}>
            <PatchHeader theme={theme}>
              <PatchTitle>{payment}</PatchTitle>
            </PatchHeader>
          </PatchContent>
        </PatchContainer> 
      </TouchableWithoutFeedback>
    </Modal>
  );
};

Payment.propTypes = {
  payment: PropTypes.string,
  setEditPayment: PropTypes.func,
};

export default Payment;