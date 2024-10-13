import React, { useState } from "react";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

function AboutYou({ route }) {
  const { username, email, password } = route.params;
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bench, setBench] = useState("");
  const [squat, setSquat] = useState("");
  const [deadlift, setDeadlift] = useState("");
  const [profileId, setProfileId] = useState(null);
  const navigation = useNavigation(); //hook used to navigate to different screens

  const saveRegister = async (token) => {
    try {
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.error("Error saving user info: ", error);
    }
  };

  const addProfile = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const profileData = {
        email: email,
        username: username,
        fname: fname,
        lname: lname,
        age: age,
        weight: weight,
        height: height,
        bench: bench,
        squat: squat,
        deadlift: deadlift,
        userId: userId,
      };
      console.log(userId);

      if (profileId) {
        const profileDocRef = doc(db, "Profiles", userId);
        await updateDoc(profileDocRef, profileData);
      } else {
        const profileRef = await addDoc(
          collection(db, "Profiles"),
          profileData
        );
        setProfileId(profileRef.id);
      }
    } catch (error) {
      console.error("Error creating profile: ", error);
    }
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        saveRegister(user.stsTokenManager.accessToken);
        await AsyncStorage.setItem("userId", user.uid);
        addProfile();
        navigation.navigate("Home");
        //Alert.alert("Registration Successful, Welcome ${user.email}");
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Registration failed!", errorMessage);
      });
  };
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => handlePress("Register")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>About You</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={setFName}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={setLName}
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Bench PR"
        value={bench}
        onChangeText={setBench}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Squat PR"
        value={squat}
        onChangeText={setSquat}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Deadlift PR"
        value={deadlift}
        onChangeText={setDeadlift}
        keyboardType="numeric"
        returnKeyType="done"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleRegister();
          // addProfile();
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    top: 40,
    left: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 20,
  },
  title: {
    color: "#39FF14",
    padding: 20,
    fontSize: "30",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#39FF14",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AboutYou;
