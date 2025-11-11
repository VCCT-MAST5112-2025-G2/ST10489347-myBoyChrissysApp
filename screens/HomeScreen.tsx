//Imports used to build screen 
import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { MenuContext } from "./MenuContent";


type HomeNav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
    const navigation = useNavigation<HomeNav>();
    const { menuItems } = useContext(MenuContext);

    //function to calculate average price per course using a for loop
    const calculateAverage = (course: "Starter" | "Main" | "Dessert") => {
        let total = 0 // initialization of total var
        let count = 0 // initialization of count var 
        //loop through menuItems 
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].course === course) {
                total += menuItems[i].price;
                count++;
            }
        }
        return count === 0 ? 0 : (total/ count).toFixed(2);

    };

    //Helper function to filter by course
    const groupedItems = (course: "Starter" | "Main" | "Dessert") =>
        menuItems.filter((item) => item.course === course);

    return (
       <LinearGradient
      colors={["#e0f7fa", "#80deea"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🍽️ Full Menu Overview</Text>

        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Chef")}
          >
            <Text style={styles.btnText}>👨‍🍳 Chef's Editor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Filter")}
          >
            <Text style={styles.btnText}>🔍 Filter Menu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.totalText}>Total Items: {menuItems.length}</Text>

        {["Starter", "Main", "Dessert"].map((course) => (
          <BlurView key={course} intensity={30} tint="light" style={styles.courseBox}>
            <Text style={styles.courseTitle}>{course}s</Text>
            <Text style={styles.avgText}>
              Average Price: {calculateAverage(course as any)} ZAR
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {groupedItems(course as any).map((item) => (
                <View key={item.id} style={styles.menuBox}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price} ZAR</Text>
                </View>
              ))}
            </ScrollView>
          </BlurView>
        ))}
      </View>
    </LinearGradient> 
    );
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#004d40",
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
  courseBox: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden",
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  avgText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  menuBox: {
    backgroundColor: "#ffffffcc",
    padding: 12,
    marginRight: 12,
    borderRadius: 12,
    width: 220,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemDesc: {
    fontStyle: "italic",
    marginVertical: 4,
  },
  itemPrice: {
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 8,
  },    
});