import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App"; //  adjust the path if needed

// importing context that makes it easier for Home screen and chefscreen to share the same data 
import { MenuContext } from "./MenuContent";

// Course type
type CourseType = "Starter" | "Main" | "Dessert";

// Menu item interface
interface MenuItem {
  id: string;
  course: CourseType;
  name: string;
  description: string;
  price: number;
}

export default function ChefScreen() {
  //  Get shared data from context
  const { menuItems, setMenuItems } = useContext(MenuContext);

  //  Get navigation object
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  // modal and form states
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);


  // form state
  const [course, setCourse] = useState<CourseType>("Starter");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const courses: CourseType[] = ["Starter", "Main", "Dessert"];

  // reset form fields
  const resetForm = () => {
    setCourse("Starter");
    setName("");
    setDescription("");
    setPrice("");
    setError("");
    setEditingItemId(null);
  };

  // add or edit menu item
  const handleAddOrEditItem = () => {
    if (!name || !description || !price) {
      setError("Please fill in all fields.");
      return;
    }

    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      setError("Price must be a number.");
      return;
    }

    if (editingItemId) {
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === editingItemId
            ? { ...item, course, name, description, price: parsedPrice }
            : item
        )
      );
    } else {
      const newItem: MenuItem = {
        id: uuid.v4().toString(),
        course,
        name,
        description,
        price: parsedPrice,
      };
      setMenuItems([...menuItems, newItem]);
    }

    setModalVisible(false);
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setCourse(item.course);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setEditingItemId(item.id);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Dish", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => setMenuItems(menuItems.filter((item) => item.id !== id)),
      },
    ]);
  };

  const groupedItems = (course: CourseType) => menuItems.filter((item) => item.course === course);

  return (
    <LinearGradient
      colors={["#e0f7fa", "#80deea"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => { resetForm(); setModalVisible(true); }}>
          <Text style={styles.addText}> + Add Item</Text>
        </TouchableOpacity>

        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total items: {menuItems.length}</Text>
        </View>

        {courses.map((courseLabel) => (
          <BlurView intensity={30} tint="light" style={styles.courseBox} key={courseLabel}>
            <Text style={styles.courseTitle}>{courseLabel}</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
              {groupedItems(courseLabel).map((item) => (
                <View key={item.id} style={styles.menuBox}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDesc}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price} ZAR</Text>

                  <View style={styles.actions}>
                    <TouchableOpacity onPress={() => handleEdit(item)}>
                      <Text style={styles.edit}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                      <Text style={styles.delete}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </BlurView>
        ))}

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modal}>
            <BlurView intensity={50} tint="light" style={styles.modal}>
              <View style={styles.form}>
                <Text style={styles.modalTitle}>{editingItemId ? "Edit Dish" : "Add New Dish"}</Text>

                <View style={styles.courseTabs}>
                  {courses.map((c) => (
                    <TouchableOpacity key={c} onPress={() => setCourse(c)}>
                      <Text style={[styles.tab, course === c && styles.activeTab]}>{c}</Text>
                    </TouchableOpacity>


                  ))}
                </View>

                <TextInput
                  placeholder="Dish Name"
                  value={name}
                  onChangeText={(text) => { setName(text); setError(""); }}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Description"
                  value={description}
                  onChangeText={(text) => { setDescription(text); setError(""); }}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Price"
                  value={price}
                  onChangeText={(text) => { setPrice(text); setError(""); }}
                  keyboardType="numeric"
                  style={styles.input}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.addBtn} onPress={handleAddOrEditItem}>
                  <Text style={styles.addText}>{editingItemId ? "Update" : "Add"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ backgroundColor: "#007aff", padding: 10, borderRadius: 20, marginTop: 10 }}
                  onPress={() => navigation.navigate("Home")}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}> Back to Home</Text>
                </TouchableOpacity>

              </View>
            </BlurView>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    overflow: "hidden"
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 40
  },
  totalBox: {
    backgroundColor: "#ffffffaa",
    padding: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 10
  },
  addText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold"
  },
  totalText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#333"
  },
  courseBox: {
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    overflow: "hidden"
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  menuBox: {
    backgroundColor: "#ffffffcc",
    padding: 12,
    marginRight: 12,
    borderRadius: 12,
    width: 220
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16
  },
  itemDesc: {
    fontStyle: "italic",
    marginVertical: 4
  },
  itemPrice: {
    textAlign: "right",
    fontWeight: "600",
    marginBottom: 8
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  edit: {
    color: "green",
    fontWeight: "bold"
  },
  delete: {
    color: "red",
    fontWeight: "bold"
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  form: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  courseTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    fontSize: 16
  },
  activeTab: {
    backgroundColor: "#007aff"
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center"
  },
  addBtn: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center"
  },
});
