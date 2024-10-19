import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
// import ImagePicker from "react-native-image-crop-picker";
//import storage from "@react-native-firebase/storage";
import { auth } from "../../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function EditProfile({ route }) {
  const navigation = useNavigation();
  const { user } = route.params;
  const [profilePic, setProfilePic] = useState(null);

  const [fname, setFName] = useState(user ? user.fname : "");
  const [lname, setLName] = useState(user ? user.lname : "");
  const [age, setAge] = useState(user ? user.age : "");
  const [weight, setWeight] = useState(user ? user.weight : "");
  const [height, setHeight] = useState(user ? user.height : "");
  const [bench, setBench] = useState(user ? user.bench : "");
  const [squat, setSquat] = useState(user ? user.squat : "");
  const [deadlift, setDeadlift] = useState(user ? user.deadlift : "");
  const [profilePath, setProfilePath] = useState(null);

  const pickImage = async () => {
    // Request permission to access the user's photos
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access media is required!");
      return;
    }

    // Let user select an image
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const selectedImageUri = pickerResult.assets[0].uri;
      setProfilePic(selectedImageUri);

      // Call uploadImage after setting the profile picture
      await uploadImage(selectedImageUri);
    }
  };

  // Update the uploadImage function to accept the image URI as an argument
  const uploadImage = async (imageUri) => {
    if (!imageUri) return;

    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Please log in to upload a profile picture.");
      return;
    }

    const token = await user.getIdToken();

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const filename = `profile_images/${user.uid}_${new Date().getTime()}.jpg`;

    const firebaseStorageUrl = `https://firebasestorage.googleapis.com/v0/b/time-2-train.appspot.com/o?name=${filename}`;

    try {
      let uploadResponse = await fetch(firebaseStorageUrl, {
        method: "POST",
        headers: {
          "Content-Type": "image/jpeg",
          Authorization: `Bearer ${token}`,
        },
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed: " + uploadResponse.statusText);
      }

      let uploadResult = await uploadResponse.json();

      const downloadUrl = `https://firebasestorage.googleapis.com/v0/b/time-2-train.appspot.com/o/${encodeURIComponent(
        filename
      )}?alt=media`;
      const userDocRef = doc(db, "Profiles", user.uid);
      setProfilePath(downloadUrl);
      await updateDoc(userDocRef, { profilePic: downloadUrl });
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const saveChanges = async () => {
    if (!user || !user.userId) return;
    try {
      const userDocRef = doc(db, "Profiles", user.userId);
      await updateDoc(userDocRef, {
        fname: fname,
        lname: lname,
        age: age,
        weight: weight,
        height: height,
        bench: bench,
        squat: squat,
        deadlift: deadlift,
        pfp: profilePath,
      });
      //alert("Profile updated successfully!");
      handlePress("Profile");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  };

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
      {/* <View style={styles.profileContainer}>
        <View style={styles.pfp}></View>
      </View> */}
      <View style={styles.profileContainer}>
        <View style={styles.pfp}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.pfpImage} />
          ) : (
            <Text style={styles.pfpPlaceholder}>No Image</Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Change Profile Picture</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <TextInput
          style={styles.name}
          returnKeyType="done"
          value={fname}
          onChangeText={setFName}
        />
        <TextInput
          style={styles.name}
          value={lname}
          returnKeyType="done"
          onChangeText={setLName}
        />
      </View>

      <View style={styles.profileOptions}></View>
      <View style={styles.prContainer}>
        <Text style={styles.label}>Stats</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                returnKeyType="done"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
              />
            </View>
            <Text style={styles.prLabel}>Height</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                returnKeyType="done"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
            <Text style={styles.prLabel}>Bodyweight</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                returnKeyType="done"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </View>
            <Text style={styles.prLabel}>Age</Text>
          </View>
        </View>
        <Text style={styles.label}>PRs</Text>
        <View style={styles.prRow}>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                keyboardType="numeric"
                returnKeyType="done"
                value={bench}
                onChangeText={setBench}
              />
            </View>
            <Text style={styles.prLabel}>Bench</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                keyboardType="numeric"
                returnKeyType="done"
                value={squat}
                onChangeText={setSquat}
              />
            </View>
            <Text style={styles.prLabel}>Squat</Text>
          </View>
          <View style={styles.prColumn}>
            <View style={styles.pr}>
              <TextInput
                style={styles.statText}
                keyboardType="numeric"
                returnKeyType="done"
                value={deadlift}
                onChangeText={setDeadlift}
              />
            </View>
            <Text style={styles.prLabel}>Deadlift</Text>
          </View>
        </View>
      </View>
      <View style={styles.saveContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text>Save</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
  },
  pfpImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  pfpPlaceholder: {
    color: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#39FF14",
    padding: 10,
    borderRadius: 20,
    width: "50%",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  nameContainer: {
    marginVertical: 20,
  },
  name: {
    color: "black",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 30,
    justifyContent: "center",
    marginBottom: 5,
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
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  prLabel: {
    fontSize: 18,
    color: "white",
  },
  saveContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  saveButton: {
    backgroundColor: "#39FF14",
    alignItems: "center",
    width: "40%",
    padding: 10,
    borderRadius: 10,
  },
});
export default EditProfile;
``;
