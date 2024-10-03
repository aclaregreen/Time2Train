import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const Welcome = () => {
  const navigation = useNavigation(); //hook used to navigate to different screens

  const checkUserLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error("Error checking login status: ", error);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handlePress("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => handlePress("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    alignItems: "center",
    position: "relative",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#39FF14",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 350,
    height: 350,
    position: "absolute",
    top: "10%",
  },
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Welcome;
