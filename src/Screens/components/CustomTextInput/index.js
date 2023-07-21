import React, { useState, useContext, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { TextInput, Animated } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from '/src/components/theme';
import PropTypes from 'prop-types';

const StyledTextInput = styled(TextInput)`
  font-family: 'Nunito';
  width: 100%;
  height: 20px;
  color: #000;
  outline-width: 0;
  outline-style: none;
  background-color: transparent;
  z-index: 1;
`;

const PlaceholderContainer = styled(Animated.View)`
  position: absolute;
  top: ${({ isFocused }) => (isFocused ? '0px' : '13px')};
  left: 35px;
  padding: 0 5px;
  background-color: ${({ isFocused, theme }) => (isFocused ? theme.background : theme.transparent)};
`;

const PlaceholderText = styled.Text`
  align-items: center;
  justify-content: center;
`;

const CustomTextInput = forwardRef(({ email, placeholder, validation, ...rest }, ref) => {
  const { theme } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');
  const translateY = new Animated.Value(isFocused || text ? -10 : 0);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(translateY, {
      toValue: -10,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (email !== '') handleChangeText(email); 
  }, [email]);

  const handleChangeText = (value) => {
    setText(value);
    validation && validation(value);
  };

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <>
      <StyledTextInput
        {...rest}
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
      />
      <PlaceholderContainer style={{ transform: [{ translateY }] }} isFocused={isFocused || text} theme={theme}>
        <PlaceholderText>{placeholder}</PlaceholderText>
      </PlaceholderContainer>
    </>
  );
});

CustomTextInput.propTypes = {
  email: PropTypes.string,
  placeholder: PropTypes.string,
  validation: PropTypes.func,
};

export default CustomTextInput;
