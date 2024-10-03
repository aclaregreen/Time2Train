import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";

function NewWorkout(props) {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.workoutButton}>
          <Image
            source={require("../assets/pencil.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.workoutButton}>
          <Image
            source={require("../assets/timer.png")}
            style={styles.icon}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Home")}
        >
          <Image source={require("../assets/home.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Track")}
        >
          <Image
            source={require("../assets/clipboard.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/plus.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Calculator")}
        >
          <Image
            source={require("../assets/calculator.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Profile")}
        >
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
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
  },
  inner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  workoutButton: {
    height: "20%",
    width: "35%",
    backgroundColor: "#444",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
    padding: 10,
  },
  navButton: {
    width: 50,
    height: 50,
    backgroundColor: "#444",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "180%",
    width: "180%",
    resizeMode: "contain",
  },
  profile: {
    height: "150%",
    width: "150%",
    resizeMode: "contain",
  },
});

export default NewWorkout;
