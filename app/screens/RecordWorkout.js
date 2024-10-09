import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const changeStats = (exerciseIndex, setIndex, stat, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex][stat] = value;
    setExercises(updatedExercises);
  };

  const addSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    const newSet = { reps: 0, weight: 0 };
    updatedExercises[exerciseIndex].sets.push(newSet);
    setExercises(updatedExercises);
  };

  const saveProgress = async () => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      const workoutData = {
        exercises: exercises,
        userId: userId,
        timeStamp: new Date().toISOString(),
      };
      await addDoc(collection(db, "Workouts"), workoutData);
      alert("Workout saved successfully");
    } catch (error) {
      console.error("Error saving workout");
      alert("Failed to save workout");
    }
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
        <TouchableOpacity style={styles.saveButton} onPress={saveProgress}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.exerciseContainer}>
        {exercises.map((exercise, exerciseIndex) => (
          <View key={exercise.id} style={styles.exercise}>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
            <View style={styles.statsHeader}>
              <Text style={[styles.headerText]}>Set</Text>
              <Text style={[styles.headerText]}>Weight</Text>
              <Text style={[styles.headerText]}>Reps</Text>
            </View>
            {exercise.sets.map((set, setIndex) => (
              <View key={setIndex} style={styles.stats}>
                <View style={styles.values}>
                  <Text style={styles.valueText}>{setIndex + 1}</Text>
                  <TextInput
                    style={styles.valueText}
                    keyboardType="numeric"
                    returnKeyType="done"
                    value={String(set.weight)}
                    onChangeText={(value) =>
                      changeStats(exerciseIndex, setIndex, "weight", value)
                    }
                    onEndEditing={() => {
                      if (set.weight === "") {
                        changeStats(exerciseIndex, setIndex, "weight", 0);
                      }
                    }}
                  />
                  <TextInput
                    style={styles.valueText}
                    keyboardType="numeric"
                    returnKeyType="done"
                    min="0"
                    value={String(set.reps)}
                    onChangeText={(value) =>
                      changeStats(exerciseIndex, setIndex, "reps", value)
                    }
                    onEndEditing={() => {
                      if (set.reps === "") {
                        changeStats(exerciseIndex, setIndex, "reps", 0);
                      }
                    }}
                  />
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addSet}
              onPress={() => addSet(exerciseIndex)}
            >
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
  saveButton: {
    backgroundColor: "#39FF14",
    width: 50,
    height: 50,
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
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
    fontSize: 18,
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
