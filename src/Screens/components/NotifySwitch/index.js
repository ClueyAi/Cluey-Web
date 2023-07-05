import React, { useContext } from "react";
import { Switch } from 'react-native-switch';
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemeContext, shadow } from "../../../components/theme";
import {
  LinkButton,
} from '..';

const NotifySwitch = ({notifyState, toggleSwitchNotify}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <LinkButton>
      <Switch
        value={notifyState}
        onValueChange={toggleSwitchNotify}
        disabled={false}
        activeText={'ON'}
        inActiveText={'OFF'}
        circleSize={16}
        barHeight={10}
        circleBorderWidth={0}
        backgroundActive={theme.textDark}
        backgroundInactive={theme.border}
        circleActiveColor={theme.text}
        circleInActiveColor={theme.background}
        renderInsideCircle={() => (
          <Ionicons name={notifyState ? 'notifications-outline' : 'notifications-off-outline'} size={14} color={theme.textGray} />
        )}
        changeValueImmediately={true}
        innerCircleStyle={{ ...shadow, alignItems: 'center', justifyContent: 'center' }}
        renderActiveText={false}
        renderInActiveText={false}
      
      />
    </LinkButton>
  );
};

export default NotifySwitch