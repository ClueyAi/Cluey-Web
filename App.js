import React from 'react';
import { useFonts } from 'expo-font';

import {LocaleProvider} from './src/components/locale';
import {FirebaseProvider} from './src/api/firebase';
import {ProvidersProvider} from './src/api/providers';
import {ThemeProvider} from './src/components/theme';
import Screens from './src/Screens/';

import { Web } from './src/components/global'

const App = () => {
  const [loaded] = useFonts({
    'Nunito': require('./assets/fonts/Nunito/static/Nunito-Regular.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito/static/Nunito-Medium.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito/static/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito/static/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito/static/Nunito-ExtraBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Web>
      <LocaleProvider>
        <FirebaseProvider>
          <ProvidersProvider>
            <ThemeProvider>
              <Screens />
            </ThemeProvider>
          </ProvidersProvider>
        </FirebaseProvider>
      </LocaleProvider>
    </Web>
  );
};

export default App;