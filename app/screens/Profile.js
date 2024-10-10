import React from "react";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

function Profile(props) {
  const navigation = useNavigation(); //hook used to navigate to different screens

  const logOut = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userToken");
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.label}>Username</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.pfp}></View>
      </View>
      <Text style={styles.name}>Name</Text>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.editProfile}>
          <Text style={styles.label}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.prContainer}>
        <Text style={styles.label}>Stats</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Height</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Bodyweight</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Age</Text>
          </View>
        </View>
        <Text style={styles.label}>PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}></View>
            <Text style={styles.prLabel}>Deadlift</Text>
          </View>
        </View>
      </View>
      <View style={styles.inner}></View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Home")}
        >
          <Image source={require("../assets/home.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../assets/clipboard.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("NewWorkout")}
        >
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

  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    //borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    width: "100%",
  },
  headerText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileContainer: {
    width: "90%",
    height: "15%",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    //backgroundColor: "#444444",
    //borderColor: "#D3D3D3",
    marginHorizontal: 20,
    justifyContent: "center",
  },
  pfp: {
    width: 120,
    height: 120,
    backgroundColor: "#444444",
    borderRadius: "60",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 30,
    justifyContent: "center",
    marginBottom: 5,
  },
  profileOptions: {
    width: "90%",
    height: "5%",
    marginBottom: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  editProfile: {
    backgroundColor: "#444444",
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 125,
  },
  prContainer: {
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

  prRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
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
export default Profile;
