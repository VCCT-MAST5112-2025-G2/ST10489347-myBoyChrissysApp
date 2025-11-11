//Imports used for projects 

import React, { useState } from "react";
import { View, Text,TextInput, TouchableOpacity, ScrollView, Modal, StyleSheet, Alert,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur"; 
import uuid from "react-native-uuid"; // used for having unique ids for each dish

// defining the type of courses available this is used in the MenuItem interface this is strictly restricted to these three types

type CourseType = "Starter" | "Main" | "Dessert";

// defining the structure of each menu item
interface MenuItem {
  id: string;
  course: CourseType;
  name: string;
  description: string;
  price: number;
}
// use of arrays which will hold all dishes and the function MenuItems to update it
export default function ChefScreen() {

  //use of states to manage  menu items using variables and modal visibility 
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // array of MenuItem objects and the function to update it
  const [modalVisible, setModalVisible] = useState(false); // state to control the visibility of the modal form its initial value is false so it is hidden at first
  const [editingItemId, setEditingItemId] = useState<string | null>(null); // state to track if we are editing an existing item or adding a new one


  //These states are used to manage the form inputs for adding or editing a menu item this is what shows up in the modal form
  const [course, setCourse] = useState<CourseType>("Starter"); // default course type is "Starter" as its first 
  const [name, setName] = useState("");// state to hold the name of the dish its initially an empty string
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  // function to reset the form fields after adding or editing an item after the add button is pressed
  const resetForm = () => {
    setCourse("Starter");
    setName("");
    setDescription("");
    setPrice("");
    setError("");//
    setEditingItemId(null); // reset editing state
  };


  // function to handle adding a new item or editing an existing one
  const handleAddOrEditItem = () => {
    //this is a validation to ensure all fields are filled out 
    if (!name || !description || !price) {
      setError("Please fill in all fields.");
      return;
    }

    // validates and ensures price is a number
    const parsedPrice = parseInt(price);
    if (isNaN(parsedPrice)) {
      setError("Price must be a number.");
      return;
    }


    // if editingItemId is set we are editing an existing item otherwise we are adding a new one
    if (editingItemId) {
      //function checks if editingItemId is set if it is we update the existing item in the menuItems array
      setMenuItems((prev) =>
        prev.map((item) => // .map is used to go through each item in the array 
          item.id === editingItemId
            ? { ...item, course, name, description, price: parsedPrice } // if the item matches we update its details
            : item // if the item id does not match it returns
        )
      );
    }
    // if not editing we create a new item and add it to the menuItems array
     else {
      //
      const newItem: MenuItem = {
        id: uuid.v4().toString(), //generates a unique id for the new dish using the uuid library
        course, 
        name,
        description,
        price: parsedPrice,
      };
      setMenuItems([...menuItems, newItem]); // adds the new item to the existing array of menu items
    }

    setModalVisible(false); // closes the modal after adding or editing
    resetForm(); // resets the form fields for future use
  };


  // function to handle editing an existing item
  const handleEdit = (item: MenuItem) => {
    setCourse(item.course);
    setName(item.name);
    setDescription(item.description);
    setPrice(item.price.toString());
    setEditingItemId(item.id);
    setModalVisible(true);
  };


  // function to handle deleting an item from the menu
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

  // function to group menu items by course type only returns items that match the specified course type
  const groupedItems = (course: CourseType) => 
    menuItems.filter((item) => item.course === course); // filters the menuItems array to return only items that match the specified course type

  return (
    <LinearGradient
      colors={["#e0f7fa", "#80deea"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
 
        {/* Button to open the modal form for adding a new dish  */ }
        <TouchableOpacity style={styles.addButton} onPress={() => { resetForm(); setModalVisible(true); }}>
          <Text style={styles.addText}> + Add Item</Text>
        </TouchableOpacity>

        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total items: {menuItems.length}</Text>
        </View>
 

        {/* Rendering course sections for Starters, Mains, and Desserts it goes over each course type */}
        {["Starter", "Main", "Dessert"].map((courseLabel) => ( 
          <BlurView intensity={30} tint="light" style={styles.courseBox} key={courseLabel}>
            <Text style={styles.courseTitle}>{courseLabel}</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {groupedItems(courseLabel as CourseType).map((item) => (
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


        {/* Modal form for adding or editing a dish */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <BlurView intensity={50} tint="light" style={styles.modal}>
            <View style={styles.form}>
              <Text style={styles.modalTitle}>
                {editingItemId ? "Edit Dish" : "Add New Dish"}
              </Text>

              <View style={styles.courseTabs}>
                {["Starter", "Main", "Dessert"].map((c) => (
                  <TouchableOpacity key={c} onPress={() => setCourse(c as CourseType)}>
                    <Text style={[styles.tab, course === c && styles.activeTab]}>{c}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                placeholder="Dish Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError("");
                }}
                style={styles.input}
              />
              <TextInput
                placeholder="Description"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  setError("");
                }}
                style={styles.input}
              />
              <TextInput
                placeholder="Price"
                value={price}
                onChangeText={(text) => {
                  setPrice(text);
                  setError("");
                }}
                keyboardType="numeric"
                style={styles.input}
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}


              <TouchableOpacity style={styles.addBtn} onPress={handleAddOrEditItem}>
                <Text style={styles.addText}>{editingItemId ? "Update" : "Add"}</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    overflow: "hidden",
  },
  addButton: {
    alignSelf: "flex-end",
    backgroundColor: "#007aff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
    marginTop: 40,
  },
  totalBox: {
    backgroundColor: "#ffffffaa",
    padding: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 50,
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
    overflow: "hidden",
  },

  courseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10
  },
  menuBox: {
    backgroundColor: "#ffffffcc",
    padding: 12,
    marginRight: 12,
    borderRadius: 12,
    width: 220,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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

  // disabled edit and delete styles
  edit: {
    color: "green",
    fontWeight: "bold"
  },

  //disabled delete styles
  delete: {
    color: "red",
    fontWeight: "bold"
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  form: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  courseTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    fontSize: 16,
  },
  activeTab: {
    backgroundColor: "#007aff",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,

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
    alignItems: "center",
  },


});   