import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext, shadow } from '/src/components/theme';

import { 
  AlertContainer,
  AlertContent,
  AlertSection,
  AlertTitle,
  AlertMessage,
  AlertUser,
  AlertAction,
  AlertButton,
  AlertButtonText
} from '..';

const AlertBox = ({ data }) => {
  const alertContentRef = useRef(null);
  const {theme} = useContext(ThemeContext);

  const handleOutsidePress = (event) => {
    if (alertContentRef.current && !alertContentRef.current.contains(event.target)) {
      if (data.onCancel) {
        data.onCancel();
      }
    }
  };

  return (
    <Modal transparent={true}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <AlertContainer theme={theme}>
          <AlertContent theme={theme} style={shadow} ref={alertContentRef}>
            <AlertTitle theme={theme}>{data.title}</AlertTitle>
            <AlertSection>
              <AlertMessage theme={theme}>{data.message1}</AlertMessage>
              <AlertUser theme={theme}>{data.name}</AlertUser>
              <AlertMessage theme={theme}>{data.message2}</AlertMessage>
            </AlertSection>
            <AlertAction>
              {data.onConfirm?
                <AlertButton style={{backgroundColor: theme.error}} onPress={data.onConfirm}>
                  <AlertButtonText theme={theme}>{data.messageConfirm}</AlertButtonText>
                </AlertButton>: null}
              {data.onCancel?
                <AlertButton style={{backgroundColor: theme.textDark}} onPress={data.onCancel}>
                  <AlertButtonText theme={theme}>{data.messageCancel}</AlertButtonText>
                </AlertButton>: null}
            </AlertAction>
          </AlertContent>
        </AlertContainer>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

AlertBox.propTypes = {
  data: PropTypes.object.isRequired
};

export default AlertBox;