import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {store} from '../store'

import {useColorScheme} from '@/components/useColorScheme';
import {Provider} from "react-redux";
import Toast from "react-native-toast-message";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
      <>
          <Provider store={ store }>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack>
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen
                          name="CreateTask"
                          options={{
                              title: 'Criar Tarefa',
                              headerTintColor: "#1f0a26",
                              headerStyle: { backgroundColor: "#bf4f74" },
                          }}
                      />
                  </Stack>
              </ThemeProvider>
          </Provider>
          <Toast position={"bottom"} />
      </>
  );
}
