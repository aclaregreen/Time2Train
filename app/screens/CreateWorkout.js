import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase";
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  FlatList,
} from "react-native";

function CreateWorkout(props) {
  const navigation = useNavigation();

  const [exerciseLib, setExerciseLib] = useState([]);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  //   const exerciseLib = [
  //     { id: "1", name: "Bench Press" },
  //     { id: "2", name: "Dumbbell Incline Press" },
  //     { id: "3", name: "Deadlift" },
  //     { id: "4", name: "Barbell Incline Press" },
  //     { id: "5", name: "Dumbbell Shoulder Press" },
  //     { id: "6", name: "Squat" },
  //     { id: "7", name: "Pull-ups" },
  //   ];
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, "Exercises"));
        const exercises = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExerciseLib(exercises);
        setFiltered(exercises);
      } catch (error) {
        console.error("Error fetching exercises: ", error);
      }
    };
    fetchExercises();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    if (query) {
      const filter = exerciseLib.filter((exercise) =>
        exercise.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(filter);
    } else {
      setFiltered(exerciseLib);
    }
  };

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  const handleAdd = () => {
    console.log("Added: ", selectedExercises);
    setSelectedExercises([]);
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
        <Text style={styles.title}>Create Workout</Text>
        <View style={styles.placeholder} />
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.exerciseItem,
              selectedExercises.some((exercise) => exercise.id === item.id)
                ? styles.selectedItem
                : null,
            ]}
            onPress={() => {
              if (
                selectedExercises.some((exercise) => exercise.id === item.id)
              ) {
                setSelectedExercises(
                  selectedExercises.filter(
                    (exercise) => exercise.id !== item.id
                  )
                );
              } else {
                setSelectedExercises([...selectedExercises, item]);
              }
            }}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedExercises.length > 0 && (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>
            Add Exercises ({selectedExercises.length})
          </Text>
        </TouchableOpacity>
      )}
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
    padding: 10,
    backgroundColor: "#444",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
  },
  placeholder: {
    width: 50,
  },
  searchBar: {
    height: 40,
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  exerciseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "white",
  },
  selectedItem: {
    backgroundColor: "#87ceeb",
  },
  addButton: {
    backgroundColor: "#39FF14",
    alignItems: "center",
    paddingVertical: 20,
  },
  addText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default CreateWorkout;
