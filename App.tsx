//Use of app.tsx to be Navigation Hub 
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screen imports 
import HomeScreen from './screens/HomeScreen'
import ChefScreen from "./screens/ChefScreen";
import FilterScreen from './screens/FilterScreen'
import { MenuProvider } from "./screens/MenuContent";// importing context.tsx that makes the 2 screens Chef and Home share the same data 

export type RootStackParamList = {
  Home: undefined;
  Chef: undefined;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    //wrapped entire app .tsx with context so that home and chefs screens share the same data 
<MenuProvider>    
<NavigationContainer>
  <Stack.Navigator
  initialRouteName="Home" 
  screenOptions={{
 headerStyle: { backgroundColor: "#80deea"},
 headerTintColor: "#fff",
 headerTitleStyle: {fontWeight:"bold"},
  }}>

  <Stack.Screen name="Home" component={HomeScreen} options={{title:"Menu" Overview}} />
  <Stack.Screen name="Chef" component={ChefScreen} options={{title: "Add Menu Item"}}/>
  <Stack.Screen name="Filter" component={FilterScreen} options={{title: "Filter Menu"}} />
  </Stack.Navigator>
</NavigationContainer>
</MenuProvider>
  );
}