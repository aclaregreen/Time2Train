import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { executeQuery } from "firebase/data-connect";

function RecordWorkout({ route }) {
  const navigation = useNavigation();
  const { addedExercises } = route.params;

  const [exercises, setExercises] = useState(
    addedExercises.map((exercise) => ({
      ...exercise,
      sets: [{ reps: 0, weight: 0 }],
    }))
  );

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
      <ScrollView style={styles.exerciseContainer}>
        {exercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.exercise}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
            {exercise.sets.map((set, index) => (
              <View key={index} style={styles.stats}>
                <View style={styles.statsHeader}>
                  <Text style={[styles.headerText]}>Set</Text>
                  <Text style={[styles.headerText]}>Weight</Text>
                  <Text style={[styles.headerText]}>Reps</Text>
                </View>
                <View style={styles.values}>
                  <Text style={styles.valueText}>{index + 1}</Text>
                  <TouchableOpacity style={styles.valueTouchable}>
                    <Text style={styles.valueText}>{set.weight}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.valueTouchable}>
                    <Text style={styles.valueText}>{set.reps}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.addSet}>
              <Text>Add Set +</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
  exercise: {
    backgroundColor: "#444",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#D3D3D3",
    borderRadius: 10,
  },
  exerciseText: {
    color: "white",
    fontWeight: "bold",
    fontSize: "18",
    paddingTop: 10,
  },
  stats: {
    width: "100%",
    alignItems: "center",
  },
  statsHeader: {
    paddingVertical: 10,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  values: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  headerText: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  valueText: {
    flex: 1,
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
  valueTouchable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addSet: {
    width: "40%",
    height: 50,
    backgroundColor: "#39FF14",
    borderRadius: 20,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default RecordWorkout;
