import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './store/store';
import {ThemeProvider, createTheme} from '@rneui/themed';
import {StatusBar} from 'react-native';

import {Header} from './components/header/header.component';
//navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//screens
import {HomeScreen} from './screens/home.screen';
import {NoteDetailsScreen} from './screens/noteDetails.screen';
import {colors} from './styles/colors';

type RootStackParamList = {
  Home: undefined;
  AddNote: undefined;
  NoteDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = createTheme({
  lightColors: {
    primary: colors.purple,
  },
  darkColors: {
    primary: colors.black,
  },
  mode: 'light',
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={colors.purple}
            />
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={({route}) => ({
                  header: props => (
                    <Header
                      title="Care Notes Master"
                      {...props}
                      isMainPage={route.name === 'Home'}
                    />
                  ),
                })}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen
                  name="NoteDetails"
                  component={NoteDetailsScreen}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
