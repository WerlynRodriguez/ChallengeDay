import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';//Only Android
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './navigation/Login';
import Register from './navigation/Register';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

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
 * @returns The app function
*/
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
    <NavigationContainer>
      <StatusBar style="auto" hidden/>

      <SafeAreaProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
        
        <Toast config={toastConfig}/>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}