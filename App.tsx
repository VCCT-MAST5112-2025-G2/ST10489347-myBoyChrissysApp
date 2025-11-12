// App.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import HomeScreen from "./screens/HomeScreen";
import ChefScreen from "./screens/ChefScreen";
import FilterScreen from "./screens/FilterScreen";

// Context
import { MenuProvider } from "./screens/MenuContent";

// RootStack params typing
export type RootStackParamList = {
  Home: undefined;
  Chef: undefined;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#80deea" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menu" }} />
          <Stack.Screen name="Chef" component={ChefScreen} options={{ title: "Add Menu Item" }} />
          <Stack.Screen name="Filter" component={FilterScreen} options={{ title: "Filter Menu" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
