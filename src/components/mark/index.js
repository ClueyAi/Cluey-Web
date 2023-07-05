import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const logo = '../../../assets/images/splash.png';
const Mark = () => {
  return (
    <View>
      <ImageBackground style={styles.logoBG} source={require('../../../assets/images/splash.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  logoBG: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.03
  }
});

export default Mark;