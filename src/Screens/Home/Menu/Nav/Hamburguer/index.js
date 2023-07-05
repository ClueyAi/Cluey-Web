import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../../../components/theme';

const Hamburguer = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <View style={{alignItems: 'center'}}>
      <View style={{height: 3, width: 20, marginBottom: 3, borderRadius: 10, backgroundColor: theme.primary}} />
      <View style={{height: 3, width: 25, borderRadius: 10, backgroundColor: theme.primary}} />
      <View style={{height: 3, width: 20, marginTop: 3, borderRadius: 10, backgroundColor: theme.primary}} />
    </View>
  );
};

export default Hamburguer;