import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import app from "./Firebase";

import Welcome from "./app/screens/Welcome";
import Register from "./app/screens/Register";
import Login from "./app/screens/Login";

import Workout from "./app/screens/Workout";
import Calculator from "./app/screens/Calculator";
import Home from "./app/screens/Home";
import Track from "./app/screens/Track";
import Profile from "./app/screens/Profile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Track"
          component={Track}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Workout"
          component={Workout}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Calculator"
          component={Calculator}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false, animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
