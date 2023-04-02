import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';//Only Android
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

/* SCREENS */
import Login from './src/navigation/Login';
import Register from './src/navigation/Register';
import HomeA from './src/navigation/artesano/HomeA';

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import store from "./src/redux/store";

let persistor = persistStore(store);

/** The Stack Navigator */
const Stack = createNativeStackNavigator();

const toastConfig = {
  error: (props) => ( 
    <ErrorToast
    {...props}
    text1Style={{
      fontSize: 18,
    }}
    text2Style={{
      fontSize: 14,
    }}
    style={{ borderLeftColor: 'red' }}
    /> 
  ),
  success: (props) => (
    <BaseToast
    {...props}
    text1Style={{
      fontSize: 18,
    }}
    text2Style={{
      fontSize: 14,
    }}
    style={{ borderLeftColor: 'green' }}
    />
  )
}


/** The app function is the main function of the app 
 * It is called when the app is loaded.
 * Create a Stack Navigator and add the HomeScreen to it.
 * @returns The app function */
export default function App() {

  useEffect(() => {
    lockScreenOrientation();
    hideNavigationBar();
  }, []);

  /** Lock the screen orientation to portrait */
  async function lockScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  /** Hide the navigation bar */
  async function hideNavigationBar() {
    //NavigationBar.setVisibilityAsync("hidden");
  }

  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <NavigationContainer>
            <StatusBar style="auto" hidden/>

            <SafeAreaProvider>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
                <Stack.Screen name='HomeA' component={HomeA} options={{ headerShown: false }} />
              </Stack.Navigator>
              
              <Toast config={toastConfig}/>
            </SafeAreaProvider>
          </NavigationContainer>

        </PersistGate>
      </Provider>
  );
}