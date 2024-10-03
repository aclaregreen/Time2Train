import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, TouchableOpacity, Text } from "react-native";

function CreateWorkout(props) {
  const navigation = useNavigation();

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => handlePress("NewWorkout")}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  back: {
    width: 80,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
    borderRadius: 15,
    marginBottom: 10,
  },
  backText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
export default CreateWorkout;
