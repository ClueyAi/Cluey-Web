import React, {useContext, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LocaleContext } from '../components/locale';

import Loading from './Utils/Loading';
// eslint-disable-next-line no-unused-vars
import Test from './Others/Test';
import AuthStackNavigator from './Auth';
import AppStackNavigator from './App';

const Stack = createStackNavigator();

const Screens = () => {
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    document.title = locale.global.app.name;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false
      }}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
        <Stack.Screen name="AppStackNavigator" component={AppStackNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;
