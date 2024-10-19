import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { auth } from "../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function EditProfile({ route }) {
  const navigation = useNavigation();
  const { user } = route.params;

  const [fname, setFName] = useState(user ? user.fname : "");
  const [lname, setLName] = useState(user ? user.lname : "");
  const [age, setAge] = useState(user ? user.age : "");
  const [weight, setWeight] = useState(user ? user.weight : "");
  const [height, setHeight] = useState(user ? user.height : "");
  const [bench, setBench] = useState(user ? user.bench : "");
  const [squat, setSquat] = useState(user ? user.squat : "");
  const [deadlift, setDeadlift] = useState(user ? user.deadlift : "");

  const saveChanges = async () => {
    if (!user || !user.userId) return;
    try {
      const userDocRef = doc(db, "Profiles", user.userId);
      await updateDoc(userDocRef, {
        fname: fname,
        lname: lname,
        age: age,
        weight: weight,
        height: height,
        bench: bench,
        squat: squat,
        deadlift: deadlift,
      });
      //alert("Profile updated successfully!");
      handlePress("Profile");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  };

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.label}>
            {user ? user.username : "Loading..."}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handlePress("Profile")}
        >
          <Text style={styles.logoutButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.pfp}></View>
      </View>
      <TextInput
        style={styles.name}
        returnKeyType="done"
        value={fname}
        onChangeText={setFName}
      />
      <TextInput
        style={styles.name}
        value={lname}
        returnKeyType="done"
        onChangeText={setLName}
      />
      <View style={styles.profileOptions}></View>
      <View style={styles.prContainer}>
        <Text style={styles.label}>Stats</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                returnKeyType="done"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </View>
            <Text style={styles.prLabel}>Height</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                returnKeyType="done"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <Text style={styles.prLabel}>Bodyweight</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                returnKeyType="done"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>
            <Text style={styles.prLabel}>Age</Text>
          </View>
        </View>
        <Text style={styles.label}>PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                keyboardType="numeric"
                returnKeyType="done"
                value={bench}
                onChangeText={setBench}
              />
            </View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                keyboardType="numeric"
                returnKeyType="done"
                value={squat}
                onChangeText={setSquat}
              />
            </View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                keyboardType="numeric"
                returnKeyType="done"
                value={deadlift}
                onChangeText={setDeadlift}
              />
            </View>
            <Text style={styles.prLabel}>Deadlift</Text>
          </View>
        </View>
      </View>
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text>Save</Text>
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
  backButton: {
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
  },
  name: {
    color: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 20,
    paddingHorizontal: 10,
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
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  prLabel: {
    fontSize: 18,
    color: "white",
  },
  saveContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  saveButton: {
    backgroundColor: "#39FF14",
    alignItems: "center",
    width: "40%",
    padding: 10,
    borderRadius: 10,
  },
});
export default EditProfile;
