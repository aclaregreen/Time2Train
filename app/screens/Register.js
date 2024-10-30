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

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const next = (screen) => {
    navigation.navigate(screen, {
      username: username,
      email: email,
      password: password,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => handlePress("Welcome")}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create an Account</Text>
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
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // handleRegister();
          // addProfile();
          next("AboutYou");
        }}
      >
        <Text style={styles.buttonText}>Next</Text>
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

export default Register;
