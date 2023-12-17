import { StyleSheet } from "react-native";
import { SplashScreen, Stack } from "expo-router";
import { Provider } from "react-redux";
import store from '../src/store/rootReducer';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default () => {

	useEffect(() => {
    SplashScreen.hideAsync(); // Hide splash screen after content loads
  }, []);

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({});
