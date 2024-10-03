import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

function Track(props) {
  const navigation = useNavigation(); // hook used to navigate to different screens

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.prContainer}>
        <Text style={styles.label}>My PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Deadlift</Text>
          </View>
        </View>
      </View>
      <View style={styles.chartsContainer}></View>
      <View style={styles.workoutsContainer}></View>
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
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  prContainer: {
    width: "90%",
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#444444",
    borderColor: "#D3D3D3",
    marginHorizontal: 20,
  },
  prRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  prColumn: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  pr: {
    width: 50,
    height: 50,
    backgroundColor: "#D3D3D3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  prLabel: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  chartsContainer: {
    width: "90%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#444444",
    borderColor: "#D3D3D3",
    marginHorizontal: 20,
  },
  workoutsContainer: {
    width: "90%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#444444",
    borderColor: "#D3D3D3",
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 2,
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
export default Track;
