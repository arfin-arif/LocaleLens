import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Platform } from "react-native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { useFonts } from "expo-font";
import React, { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import { UserLocationContext } from "./App/Context/UserLocationContext";
// import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import LoginScreen from "./App/Screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { CLERK_API } from "./App/utils/config";

SplashScreen.preventAutoHideAsync();
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // ----------------------fonts
  const [fontsLoaded, fontError] = useFonts({
    "font-bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "font-md": require("./assets/fonts/Outfit-Medium.ttf"),
    "font-reg": require("./assets/fonts/Outfit-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <ClerkProvider
      // tokenCache={tokenCache}
      publishableKey={CLERK_API}
    >
      <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <UserLocationContext.Provider value={{ location, setLocation }}>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </UserLocationContext.Provider>
        </SignedIn>
        <SignedOut>
          <LoginScreen></LoginScreen>
        </SignedOut>
      </View>
    </ClerkProvider>

    // <View style={styles.container}>
    //   <UserLocationContext.Provider value={{ location, setLocation }}>
    //     <NavigationContainer>
    //       <TabNavigation />
    //     </NavigationContainer>
    //   </UserLocationContext.Provider>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
