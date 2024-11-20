import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebase";
import { collection, addDoc, getDocs, getDoc } from "firebase/firestore";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";

function Home(props) {
  const navigation = useNavigation(); //hook used to navigate to different screens
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [users, setUsers] = useState([]);

  const handlePress = (screen) => {
    navigation.navigate(screen);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapShot = await getDocs(collection(db, "Profiles"));
        const profiles = querySnapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(profiles);
        //setFiltered(profiles);
      } catch (error) {
        console.error("Error fetching exercises: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    if (query) {
      const filter = users.filter((user) =>
        user.fname.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(filter);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* need to add search bar to search for other users, view profile and stats */}
      <View style={styles.inner}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Users"
          value={search}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filtered}
          style={styles.list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userSearch}>
              <Text>
                {item.fname} {item.lname}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* <Text style={styles.text}>Home Screen</Text> */}
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
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
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handlePress("NewWorkout")}
        >
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
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  inner: {
    flex: 1,
    alignItems: "center",
  },
  list: {
    width: "90%",
  },
  searchBar: {
    height: 40,
    width: "90%",
    borderColor: "grey",
    backgroundColor: "white",
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  userSearch: {
    backgroundColor: "#aaa",
    padding: 15,
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
export default Home;
