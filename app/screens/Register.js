import React, { useState } from "react";
import { auth } from "../../Firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
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
        username: username,
        fname: fname,
        lname: lname,
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
        onPress={() => handlePress("Welcome")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        returnKeyType="done"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        returnKeyType="done"
      />
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
};

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

export default Register;
