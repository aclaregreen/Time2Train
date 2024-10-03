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

  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
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
