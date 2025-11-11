// screens/FilterScreen.tsx
import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MenuContext } from "../screens/MenuContent";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type FilterNav = NativeStackNavigationProp<RootStackParamList, "Filter">;

export default function FilterScreen() {
  const navigation = useNavigation<FilterNav>();
  const { menuItems } = useContext(MenuContext);

  // state to store the currently selected course
  const [selectedCourse, setSelectedCourse] = useState<"Starter" | "Main" | "Dessert" | null>(null);

  // filter logic: only show items matching the selected course
  const filteredItems = selectedCourse
    ? menuItems.filter((item) => item.course === selectedCourse)
    : [];

  return (
    <LinearGradient
      colors={["#e0f7fa", "#80deea"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🔍 Filter Menu</Text>

        {/* Filter buttons */}
        <View style={styles.filterButtons}>
          {["Starter", "Main", "Dessert"].map((course) => (
            <TouchableOpacity
              key={course}
              style={[
                styles.filterButton,
                selectedCourse === course && styles.activeButton,
              ]}
              onPress={() => setSelectedCourse(course as any)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCourse === course && styles.activeText,
                ]}
              >
                {course}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Display filtered results */}
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {selectedCourse ? (
            filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <BlurView key={item.id} intensity={30} tint="light" style={styles.itemBox}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price} ZAR</Text>
                </BlurView>
              ))
            ) : (
              <Text style={styles.emptyText}>No items found for {selectedCourse}.</Text>
            )
          ) : (
            <Text style={styles.emptyText}>Select a course to filter items.</Text>
          )}
        </ScrollView>

        {/* Navigation back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
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
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#007aff",
  },
  activeButton: {
    backgroundColor: "#007aff",
  },
  filterText: {
    color: "#007aff",
    fontWeight: "bold",
  },
  activeText: {
    color: "#fff",
  },
  itemBox: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.8)",
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
  },
  emptyText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  backBtn: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
