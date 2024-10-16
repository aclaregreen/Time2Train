import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFirestore,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";

function Track(props) {
  const navigation = useNavigation(); // hook used to navigate to different screens
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [userWorkouts, setUserWorkouts] = useState([]);

  //fetch the userId from AsyncStorage
  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      if (!userId) return;

      try {
        const workoutCollection = collection(db, "Workouts");
        const q = query(workoutCollection, where("userId", "==", userId));
        const querySnapShot = await getDocs(q);

        if (!querySnapShot.empty) {
          const data = querySnapShot.docs.map((doc) => doc.data());
          setUserWorkouts(data);
        } else {
          console.log("No such user found");
        }
      } catch (error) {
        console.log("Error loading user workouts: ", error);
      }
    };
    const fetchUserProfile = async () => {
      if (!userId) return;

      try {
        const profileCollection = collection(db, "Profiles");
        const q = query(profileCollection, where("userId", "==", userId));
        const querySnapShot = await getDocs(q);

        if (!querySnapShot.empty) {
          const data = querySnapShot.docs[0].data();
          setUser(data);
        } else {
          console.log("No such user found");
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
      }
    };
    fetchUserProfile();
    fetchUserWorkouts();
  }, [userId]);

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.prContainer}>
        <Text style={styles.label}>My PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text>{user ? user.squat : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text>{user ? user.bench : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text>{user ? user.deadlift : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Deadlift</Text>
          </View>
        </View>
      </View>
      <View style={styles.workoutsContainer}>
        <Text style={styles.myWorkoutsText}>My Workouts</Text>
        <ScrollView style={styles.workoutsList}>
          {userWorkouts.map((workout, index) => (
            <View key={workout.id} style={styles.workout}>
              <Text style={styles.workoutText}>{workout.timeStamp}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* <View style={styles.chartsContainer}></View> */}
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
  workoutsContainer: {
    width: "90%",
    height: "70%",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#444444",
    borderColor: "#D3D3D3",
    marginHorizontal: 20,
  },
  myWorkoutsText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    padding: 10,
  },
  workoutText: {
    color: "white",
    fontSize: 18,
    padding: 10,
  },
  chartsContainer: {
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
export default Track;
