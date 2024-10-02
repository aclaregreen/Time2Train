import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

function Profile(props) {
  const navigation = useNavigation(); //hook used to navigate to different screens

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}></View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Home")}
        >
          <Image source={require("../assets/home.png")} style={styles.home} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../assets/clipboard.png")}
            style={styles.clipboard}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Workout")}
        >
          <Image source={require("../assets/timer.png")} style={styles.timer} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Calculator")}
        >
          <Image
            source={require("../assets/calculator.png")}
            style={styles.calculator}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  inner: {
    flex: 1,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
    padding: 10,
    width: "100%",
  },
  navButton: {
    width: 50,
    height: 50,
    backgroundColor: "#444",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  home: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  clipboard: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  timer: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  calculator: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
  profile: {
    height: 75,
    width: 75,
    resizeMode: "contain",
  },
});
export default Profile;
