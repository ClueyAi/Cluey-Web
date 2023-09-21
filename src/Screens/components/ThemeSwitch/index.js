import React, { useContext, useState, useEffect } from "react";
import { Switch } from 'react-native-switch';
import Ionicons from "@expo/vector-icons/Ionicons";
import PropTypes from 'prop-types';

import { ThemeContext, shadow } from "/src/components/theme";
import {
  LinkButton,
} from '..';

const ThemeSwitch = ({themeState, toggleSwitchTheme, circleSize, barHeight}) => {
  const {theme} = useContext(ThemeContext);

  const [value, setValue] = useState(false);

  const toggleSwitch = (value) => {
    setValue(value);
    toggleSwitchTheme(value);
  };

  useEffect(() => {
    setValue(themeState);
  }, [themeState]);

  return (
    <LinkButton>
      <Switch
        value={value}
        onValueChange={toggleSwitch}
        disabled={false}
        activeText={'ON'}
        inActiveText={'OFF'}
        circleSize={circleSize?circleSize:16}
        barHeight={barHeight?barHeight:10}
        circleBorderWidth={0}
        backgroundActive={theme.textDark}
        backgroundInactive={theme.border}
        circleActiveColor={theme.text}
        circleInActiveColor={theme.background}
        renderInsideCircle={() => (
          <Ionicons name={value ? 'moon' : 'sunny'} size={barHeight?barHeight /1.6:10} color={value?theme.textGray:theme.text} />
        )}
        changeValueImmediately={true}
        innerCircleStyle={{ ...shadow, alignItems: 'center', justifyContent: 'center' }}
        renderActiveText={false}
        renderInActiveText={false}
      
      />
    </LinkButton>
  );
};

ThemeSwitch.propTypes = {
  themeState: PropTypes.bool,
  toggleSwitchTheme: PropTypes.func,
  circleSize: PropTypes.number,
  barHeight: PropTypes.number,
};

export default ThemeSwitch