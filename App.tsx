// App.tsx Manages Navigation of our app to all screens uses Nav container and Stack Navigator which stacks the screens
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 

// Screen imports from the screens folder !
import HomeScreen from "./screens/HomeScreen";
import ChefScreen from "./screens/ChefScreen";
import FilterScreen from "./screens/FilterScreen";

// Context used to share data between the Home And Chefs Screen 
import { MenuProvider } from "./screens/MenuContent";

// RootStack params that are undefined for error handling and autocompletion 
export type RootStackParamList = {
  Home: undefined;
  Chef: undefined;
  Filter: undefined;
};
//variable used to define all screens and Nav
const Stack = createNativeStackNavigator<RootStackParamList>();


//export default wrapped with MenuProvider which shares data to the screens selected using the menu state 
export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home" // when app runs it starts on this screen  use of screen options to apply styling to the other screens 
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
