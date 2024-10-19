import React, { useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { signOut } from "@firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
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
import { useCallback } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Function to get the download URL
const fetchImageUrl = async (imagePath) => {
  const storage = getStorage();
  const imageRef = ref(storage, imagePath);

  try {
    const url = await getDownloadURL(imageRef);
    return url;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
};

function Profile(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    fetchUserId();
  }, []);

  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      const profileDocRef = doc(db, "Profiles", userId);
      const profile = await getDoc(profileDocRef);

      if (profile.exists()) {
        const data = profile.data();
        setUser(data);

        // Fetch the profile picture URL
        if (data.pfp) {
          const url = await fetchImageUrl(data.pfp);
          setProfilePictureUrl(url);
        }
      } else {
        console.log("No such user found");
      }
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [userId])
  );

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

  const editProfile = (screen) => {
    navigation.navigate(screen, { user: user });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.label}>
            {user ? user.username : "Loading..."}
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logOut}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        {profilePictureUrl ? (
          <Image source={{ uri: profilePictureUrl }} style={styles.pfpImage} />
        ) : (
          <View style={styles.pfp}>
            <Text style={styles.pfpPlaceholder}>No Image</Text>
          </View>
        )}
      </View>
      <Text style={styles.name}>
        {user ? user.fname : ""} {user ? user.lname : ""}
      </Text>
      <View style={styles.profileOptions}>
        <TouchableOpacity
          style={styles.editProfile}
          onPress={() => editProfile("EditProfile")}
        >
          <Text style={styles.label}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.prContainer}>
        <Text style={styles.label}>Stats</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.height : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Height</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.weight : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Bodyweight</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.age : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Age</Text>
          </View>
        </View>
        <Text style={styles.label}>PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.bench : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.squat : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.deadlift : ""}</Text>
            </View>
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Track")}
        >
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
    marginHorizontal: 20,
    justifyContent: "center",
  },
  pfp: {
    width: 120,
    height: 120,
    backgroundColor: "#444444",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  pfpImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  pfpPlaceholder: {
    color: "white",
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
    color: "white",
  },
  inner: {
    flex: 1,
    marginBottom: 60,
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
