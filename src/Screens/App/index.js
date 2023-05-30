import React, {useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from '@expo/vector-icons/Ionicons';

import { LocaleContext } from '../../components/locale';
import { ThemeContext } from '../../components/theme';
import { MainTitle, TalkTitle, MenuButton, LogoutButton, LanguageSelector, SettingsButton, BackButton } from '../../components/tools';

import Home from './Home';
import Menu from './Menu';

import Chat from './Chat';
import Talk from './Talk';

import Settings from './Settings';
import Account from './Settings/Account';
import Email from './Settings/Account/Email';
import Password from './Settings/Account/Password';

import Preferences from '../Utils/Preferences';
import About from '../Utils/About';
import Rules from '../Utils/Rules';

const AppStack = createStackNavigator();

const App = () => {
  const {locale} = React.useContext(LocaleContext);
  const {theme} = React.useContext(ThemeContext);

  useEffect(() => {
    document.title = locale.global.app.name;
  }, []);

  return (
    <AppStack.Navigator screenOptions={{
      headerShadowVisible: false,
      headerTitleAlign: 'center',
      headerBackImage: () => <Ionicons name="chevron-back" size={28} color={theme.primary}/>,
      headerTintColor: theme.primary,
    }}>
      <AppStack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerLeft: () => <MenuButton navigation={navigation} />,
          headerTitle: () => <MainTitle />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <AppStack.Screen
        name="Menu"
        component={Menu}
        options={() => ({
          headerTitle: () => <TalkTitle />
        })}
      />
      <AppStack.Screen
        name="Chat"
        component={Chat}
        options={({ navigation }) => ({
          headerTitle: () => <MainTitle />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <AppStack.Screen
        name="Talk"
        component={Talk}
        options={({ navigation }) => ({
          headerTitle: () => <TalkTitle />,
          headerRight: () => <SettingsButton navigation={navigation} />,
        })}
      />
      <AppStack.Screen 
        name="Settings" 
        component={Settings}
        options={{
          headerTitle: locale.settings.title,
          headerRight: () => <LanguageSelector/>,
          headerRightContainerStyle: {
            marginTop: 5,
          },
          headerTintColor: theme.primary,
          headerTitleStyle: {
            fontFamily: 'Nunito-Bold',
            fontSize: 24,
          },
        }}
      />
      <AppStack.Screen
        name="Account"
        component={Account}
        options={({navigation}) => ({
          headerTitle: locale.account.title,
          headerRight: () => <LogoutButton navigation={navigation}/>,
          headerTintColor: theme.primary,
          headerTitleStyle: {
            fontFamily: 'Nunito-Bold',
            fontSize: 24,
          }
        })}
      />
      <AppStack.Screen
        name="Preferences"
        component={Preferences}
        options={() => ({
          headerTitle: locale.preferences.title,
          headerTintColor: theme.primary,
          headerTitleStyle: {
            fontFamily: 'Nunito-Bold',
            fontSize: 24,
          }
        })}
      />
      <AppStack.Group screenOptions={({navigation}) => ({
        headerLeft: () => <BackButton navigation={navigation}/>,
        headerTitle: '',
      })}>
        <AppStack.Screen name="Email" component={Email}/>
        <AppStack.Screen name="Password" component={Password}/>
        <AppStack.Screen name="About" component={About}/>
        <AppStack.Screen name="Rules" component={Rules}/>
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default App;