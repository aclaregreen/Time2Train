import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

function Calculator(props) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [rpe, setRpe] = useState("");
  const [oneRm, setOneRm] = useState(null);
  const navigation = useNavigation(); //hook to access navigation between screens

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const calculateMax = () => {
    //const rir = 10 - parseFloat(rpe);

    const max = Math.round(
      (parseFloat(weight) * (1 + parseInt(reps) / 30)) /
        (1.0333 - 0.0333 * (10 - parseInt(rpe)))
    );
    setOneRm(max);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Weight lifted (lbs/kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="done"
          placeholder="Enter weight"
          value={weight}
          onChangeText={(text) => setWeight(text)}
        />

        <Text style={styles.label}>Number of Reps</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="done"
          placeholder="Enter Reps"
          value={reps}
          onChangeText={(text) => setReps(text)}
        />

        <Text style={styles.label}>RPE</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="done"
          placeholder="Enter RPE"
          value={rpe}
          onChangeText={(text) => setRpe(text)}
        />

        <TouchableOpacity style={styles.button} onPress={calculateMax}>
          <Text style={styles.buttonText}>Calculate 1RM</Text>
        </TouchableOpacity>

        {oneRm !== null && oneRm >= 0 && (
          <Text style={styles.result}>{oneRm} (lbs/kgs)</Text>
        )}
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Home")}
        >
          <Image source={require("../assets/home.png")} style={styles.home} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Track")}
        >
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
        <TouchableOpacity style={styles.navButton}>
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
  button: {
    backgroundColor: "#39FF14",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  result: {
    color: "white",
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
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

export default Calculator;
