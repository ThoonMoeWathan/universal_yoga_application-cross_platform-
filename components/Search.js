import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Search = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState("");

  const searchHandler = () => {
    if (selectedDay === "" && selectedTime === "") {
      Alert.alert("Warning", "You must choose at least one filter.");
    } else {
      // Reset previous results and message
      setSearchedData([]);
      setMessage("");

      setHasSearched(true); // Mark as searched
      searchClassData(); // Perform the search
    }
  };

  const searchClassData = async () => {
    const searchQuery = { day: selectedDay, time: selectedTime };

    try {
      const response = await fetch(
        "http://192.168.100.102/UniversalYogaSite/searchClass.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchQuery),
        }
      );

      const json = await response.json();
      console.log("Fetched Data:", json);

      if (response.ok) {
        if (json.message) {
          setMessage(json.message); // Set the message from the API
        } else {
          setSearchedData(json); // Set the searched data if message doesn't exist
          setMessage(""); // Clear any previous message
        }
      } else {
        setSearchedData([]); // Clear data if no result
        setMessage("No classes found for the selected criteria.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while fetching data.");
    }
  };

  const showSearchedItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.textStyle}>Day: {item.day_of_week}</Text>
      <Text style={styles.textStyle}>Time: {item.time_of_course}</Text>
      <Text style={styles.textStyle}>Type: {item.type_of_class}</Text>
      <Text style={styles.textStyle}>Date: {item.date_of_class}</Text>
      <Text style={styles.textStyle}>Teacher: {item.teacher}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <Text>Choose either Day of week or Time of class.</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Day Picker */}
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue) => setSelectedDay(itemValue)}
          >
            <Picker.Item label="Day" value="0" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </View>

        {/* Time Picker */}
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedTime}
            onValueChange={(itemValue) => setSelectedTime(itemValue)}
          >
            <Picker.Item label="Time" value="" />
            <Picker.Item label="08:00 AM" value="08:00 AM" />
            <Picker.Item label="10:00 AM" value="10:00 AM" />
            <Picker.Item label="12:00 PM" value="12:00 PM" />
            <Picker.Item label="02:00 PM" value="02:00 PM" />
            <Picker.Item label="04:00 PM" value="04:00 PM" />
            <Picker.Item label="06:00 PM" value="06:00 PM" />
            <Picker.Item label="08:00 PM" value="08:00 PM" />
          </Picker>
        </View>

        {/* Search Button */}
        <TouchableOpacity onPress={searchHandler} style={styles.button} >
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* <Button title="Search" onPress={searchHandler} style={styles.buttonStyle} /> */}

      {hasSearched && message ? (
        <View style={styles.itemContainer}>
          <Text>{message}</Text>
        </View>
      ) : null}

      {searchedData.length > 0 && (
        <FlatList
          style={styles.flatListStyle}
          data={searchedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={showSearchedItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    width: "100%",
  },
  picker: {
    borderColor: "pink",
    borderWidth: 2,
    borderRadius: 15,
    padding: 2,
    marginVertical: 20,
    width: "45%",
  },
  flatListStyle: {
    width: "100%",
    marginBottom:120
  },
  itemContainer: {
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#d7b0e2",
    borderRadius: 10,
    padding: 20,
  },
  textStyle: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
  },
});

export default Search;
