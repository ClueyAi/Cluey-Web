import React, {useContext, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocaleContext } from '../../components/locale';
import { LanguageSelector, LogoutButton, AboutButton, BackButton } from '../../components/tools';

import New from './New';
import Welcome from './New/Welcome';
import SignIn from './New/SignIn';
import Current from './Current';
import SignUp from './Current/SignUp';
import Forgot from './Forgot';
import Verify from './Verify';

import Preferences from '../Utils/Preferences';
import About from '../Utils/About';
import Rules from '../Utils/Rules';

const AuthStack = createStackNavigator();

const Auth = () => {
  const {locale} = useContext(LocaleContext);

  useEffect(() => {
    document.title = locale.global.app.name;
  }, []);

  return (
    <AuthStack.Navigator screenOptions={({navigation}) => ({
      headerRight: () => {<LanguageSelector/>},
      headerLeft: () => {<AboutButton navigation={navigation}/>},
      headerShadowVisible: false,
      headerTitle: '',
      headerBackImage: () => {<Ionicons name="chevron-back" size={28} color="#FFBF00"/>},
      headerTintColor: '#FFBF00',
    })}>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
      />
      <AuthStack.Screen name="New" component={New}/>
      <AuthStack.Screen name="Current" component={Current}/>
      <AuthStack.Screen
        name="Verify"
        component={Verify}
        options={({navigation}) => ({
          headerRight: () => {<LogoutButton navigation={navigation}/>},
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })}
      />
      <AuthStack.Screen
        name="Preferences"
        component={Preferences}
        options={() => ({
          headerLeft: null,
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
        })}
      />
      <AuthStack.Group screenOptions={({navigation}) => {{() => {<BackButton navigation={navigation}/>}}}}>
        <AuthStack.Screen name="SignIn" component={SignIn}/>
        <AuthStack.Screen name="SignUp" component={SignUp}/>
        <AuthStack.Screen name="Forgot" component={Forgot}/>
        <AuthStack.Screen name="About" component={About}/>
        <AuthStack.Screen name="Rules" component={Rules}/>
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default Auth;