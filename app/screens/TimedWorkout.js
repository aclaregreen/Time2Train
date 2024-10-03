import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import Calculator from "./Calculator";

const TimeSelector = ({ setTime }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handlePress = (duration) => {
    if (selectedTime === duration) {
      setSelectedTime(null);
      setTime(null);
    } else {
      setSelectedTime(duration);
      setTime(duration);
    }
  };

  const buttonStyle = (duration) => ({
    ...styles.square4,
    borderColor: selectedTime === duration ? "#39FF14" : "#D3D3D3",
  });

  return (
    <View>
      <Text style={styles.label}>Choose your Time</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle("15 min")}
          onPress={() => handlePress("15 min")}
        >
          <Text style={styles.buttonText}>15 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("30 min")}
          onPress={() => handlePress("30 min")}
        >
          <Text style={styles.buttonText}>30 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("1 hour")}
          onPress={() => handlePress("1 hour")}
        >
          <Text style={styles.buttonText}>1 hour</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("1.5 hours")}
          onPress={() => handlePress("1.5 hours")}
        >
          <Text style={styles.buttonText}>1.5 hours</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const WorkoutTypeSelector = ({ setType }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handlePress = (kind) => {
    if (selectedType === kind) {
      setSelectedType(null);
      setType(null);
    } else {
      setSelectedType(kind);
      setType(kind);
    }
  };
  const buttonStyle = (kind) => ({
    ...styles.square2,
    borderColor: selectedType === kind ? "#39FF14" : "#D3D3D3",
  });

  return (
    <View>
      <Text style={styles.label}>Workout Type</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle("Strength")}
          onPress={() => handlePress("Strength")}
        >
          <Text style={styles.buttonText}>Strength</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Endurance")}
          onPress={() => handlePress("Endurance")}
        >
          <Text style={styles.buttonText}>Endurance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EnviroSelector = ({ setEnviro }) => {
  const [selectedEnviro, setSelectedEnviro] = useState(null);

  const handlePress = (location) => {
    if (selectedEnviro === location) {
      setSelectedEnviro(null);
      setEnviro(null);
    } else {
      setSelectedEnviro(location);
      setEnviro(location);
    }
  };
  const buttonStyle = (location) => ({
    ...styles.square2,
    borderColor: selectedEnviro === location ? "#39FF14" : "#D3D3D3",
  });

  return (
    <View>
      <Text style={styles.label}>Workout Environment</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle("Equipment")}
          onPress={() => handlePress("Equipment")}
        >
          <Text style={styles.buttonText}>Equipment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("No Equipment")}
          onPress={() => handlePress("No Equipment")}
        >
          <Text style={styles.buttonText}>No Equipment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MgSelector = ({ setMuscleGroups }) => {
  const [selectedMuscles, setSelectedMuscles] = useState([]);

  const handlePress = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(
        selectedMuscles.filter((selected) => selected !== muscle)
      );
      setMuscleGroups((prev) => prev.filter((m) => m !== muscle));
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
      setMuscleGroups((prev) => [...prev, muscle]);
    }
  };

  const buttonStyle = (muscle) => ({
    ...styles.square2,
    borderColor: selectedMuscles.includes(muscle) ? "#39FF14" : "#D3D3D3",
  });

  return (
    <View>
      <Text style={styles.label}>Muscle Groups</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={buttonStyle("Abs")}
          onPress={() => handlePress("Abs")}
        >
          <Text style={styles.buttonText}>Abs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Biceps")}
          onPress={() => handlePress("Biceps")}
        >
          <Text style={styles.buttonText}>Biceps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Calves")}
          onPress={() => handlePress("Calves")}
        >
          <Text style={styles.buttonText}>Calves</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Chest")}
          onPress={() => handlePress("Chest")}
        >
          <Text style={styles.buttonText}>Chest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Forearms")}
          onPress={() => handlePress("Forearms")}
        >
          <Text style={styles.buttonText}>Forearms</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Glutes")}
          onPress={() => handlePress("Glutes")}
        >
          <Text style={styles.buttonText}>Glutes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Hamstrings")}
          onPress={() => handlePress("Hamstrings")}
        >
          <Text style={styles.buttonText}>Hamstrings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Lats")}
          onPress={() => handlePress("Lats")}
        >
          <Text style={styles.buttonText}>Lats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Lower Back")}
          onPress={() => handlePress("Lower Back")}
        >
          <Text style={styles.buttonText}>Lower Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Obliques")}
          onPress={() => handlePress("Obliques")}
        >
          <Text style={styles.buttonText}>Obliques</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Quads")}
          onPress={() => handlePress("Quads")}
        >
          <Text style={styles.buttonText}>Quads</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Shoulders")}
          onPress={() => handlePress("Shoulders")}
        >
          <Text style={styles.buttonText}>Shoulders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Traps")}
          onPress={() => handlePress("Traps")}
        >
          <Text style={styles.buttonText}>Traps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle("Triceps")}
          onPress={() => handlePress("Triceps")}
        >
          <Text style={styles.buttonText}>Triceps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function TimedWorkout() {
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [enviro, setEnviro] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const navigation = useNavigation(); //hook to access navigation between screens

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => handlePress("NewWorkout")}
        >
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        {/* TimeSelector Component */}
        <TimeSelector setTime={setTime} />

        <WorkoutTypeSelector setType={setType} />

        <EnviroSelector setEnviro={setEnviro} />

        <MgSelector setMuscleGroups={setMuscleGroups} />

        {time !== "" &&
          type !== "" &&
          enviro !== "" &&
          muscleGroups.length > 0 && (
            <View>
              <TouchableOpacity style={styles.next}>
                <Text style={styles.buttonText}>Start Workout</Text>
              </TouchableOpacity>
            </View>
          )}
      </ScrollView>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Home")}
        >
          <Image source={require("../assets/home.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Track")}
        >
          <Image
            source={require("../assets/clipboard.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image source={require("../assets/plus.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("Calculator")}
        >
          <Image
            source={require("../assets/calculator.png")}
            style={styles.icon}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#000000",
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
  scrollView: {
    padding: 10,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  label: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  square2: {
    width: "45%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#444444",
  },
  square4: {
    width: "45%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#444444",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  next: {
    backgroundColor: "#39FF14",
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#000",
    padding: 10,
  },
  navButton: {
    width: 50,
    height: 50,
    backgroundColor: "#444",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    height: "180%",
    width: "180%",
    resizeMode: "contain",
  },
  profile: {
    height: "150%",
    width: "150%",
    resizeMode: "contain",
  },
});

export default TimedWorkout;
