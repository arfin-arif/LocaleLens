import * as WebBrowser from "expo-web-browser";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import Colors from "../Shared/Colors";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { mapAPI } from "../utils/config";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 80,
        justifyContent: "center",
      }}
    >
      <Image
        style={styles.logo}
        source={require("./../../assets/images/logo/locallens (1).png")}
        sty
      />

      <Image
        style={styles.bgImage}
        source={require("./../../assets/images/business.jpg")}
        sty
      />

      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Welcome to the Local Business Portal!</Text>
        <Text style={styles.subtitle}>
          Find the best local businesses near you.
        </Text>

        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text
            style={{
              color: Colors.BLACK,
              textAlign: "center",
              fontFamily: "font-reg",
              fontSize: 17,
            }}
          >
            Login With Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 60,
    objectFit: "contain",
  },
  bgImage: {
    width: "100%",
    height: 240,
    marginTop: 20,
    objectFit: "cover",
  },
  title: {
    fontSize: 17,
    fontFamily: "font-bold",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "font-reg",
    textAlign: "center",
    marginTop: 10,
    color: "#318CE7",
  },

  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    display: "flex",
    borderRadius: 99,
    marginTop: 40,
  },
});
