import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

function RecordWorkout(props) {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handlePress("NewWorkout")}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Workout</Text>
        <View style={styles.placeholder}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
  },
  placeholder: {
    width: 50,
  },
});
export default RecordWorkout;
