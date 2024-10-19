import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function EditProfile({ route }) {
  const navigation = useNavigation();
  const { user } = route.params;
  const handlePress = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.label}>
            {user ? user.username : "Loading..."}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handlePress("Profile")}
        >
          <Text style={styles.logoutButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.pfp}></View>
      </View>
      <Text style={styles.name}>
        {user ? user.fname : ""} {user ? user.lname : ""}
      </Text>
      <View style={styles.profileOptions}></View>
      <View style={styles.prContainer}>
        <Text style={styles.label}>Stats</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.height : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Height</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.weight : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Bodyweight</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.age : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Age</Text>
          </View>
        </View>
        <Text style={styles.label}>PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.bench : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.squat : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <Text style={styles.statText}>{user ? user.deadlift : ""}</Text>
            </View>
            <Text style={styles.prLabel}>Deadlift</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  label: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingBottom: 10,
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    width: "100%",
  },
  headerText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileContainer: {
    width: "90%",
    height: "15%",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  pfp: {
    width: 120,
    height: 120,
    backgroundColor: "#444444",
    borderRadius: 60,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 30,
    justifyContent: "center",
    marginBottom: 5,
  },
  profileOptions: {
    width: "90%",
    height: "5%",
    marginBottom: 15,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  prContainer: {
    width: "90%",
    height: "35%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#444444",
    borderColor: "#D3D3D3",
    marginHorizontal: 20,
  },
  prRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingBottom: 10,
  },
  prColumn: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  pr: {
    width: 50,
    height: 50,
    backgroundColor: "#D3D3D3",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  prLabel: {
    fontSize: 18,
    color: "white",
  },
});
export default EditProfile;
