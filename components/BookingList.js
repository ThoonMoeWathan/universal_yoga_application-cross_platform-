import { View, Text, TextInput, StyleSheet, Button, FlatList, Alert, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

const BookingList = () => {
  const [email, setEmail] = useState('');
  const [bookedData, setBookedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [message, setMessage] = useState('');

  const bookHandler = () => {
    if (email.trim() === '') {
      Alert.alert('Warning', 'You must input your email.');
      setBookedData([]);
      setMessage('');
    } else {
      setHasSearched(true);
      setMessage('');
      bookingList();
    }
  };

  const bookingList = async () => {
    setIsLoading(true);
    const bookQuery = { email: email };

    try {
      const response = await fetch('http://192.168.100.102/UniversalYogaSite/bookinglist.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookQuery),
      });

      const json = await response.json();
      console.log('Fetched Data:', json);

      if (response.ok && json.length > 0) {
        setBookedData(json);
        setMessage('');
      } else {
        setBookedData([]);
        setMessage('No classes found for this email.');
      }
    } catch (error) {
      console.error(error);
      setBookedData([]);
      setMessage('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearHandler = () => {
    setEmail('')
    setBookedData([])
    setMessage('')
  }
  const showBookedItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.textStyle}>Date: {item.date_of_class}</Text>
      <Text style={styles.textStyle}>Teacher: {item.teacher}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>View Booking</Text>
      
      {/* {data.map((value,index)=>{<Text>{value}</Text>})} */}

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
      />
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginEnd: 10, width: 180 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={bookHandler} disabled={isLoading}>
            <Text>Show Booking</Text>
          </TouchableOpacity>
          {/* <Button title="Show Booking" onPress={bookHandler} disabled={isLoading} /> */}
        </View>
        <View style={{ width: 180 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={clearHandler} disabled={isLoading}>
            <Text>Clear All</Text>
          </TouchableOpacity>
          {/* <Button title="Clear All" onPress={clearHandler} disabled={isLoading} /> */}
        </View>
      </View>
        

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={styles.resultsContainer}>
            {message ? (
              <Text style={{color:"red"}}>{message}</Text>
            ) : (
              <FlatList
                style={styles.flatListStyle}
                  data={bookedData || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={showBookedItem}
              />
            )}
          </View>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop:20,
    paddingVertical: 20,
  },
  title: {
    marginStart:20,
    alignSelf:"flex-start",
    fontSize: 25,
    marginBottom: 15,
  },
  input: {
    marginVertical: 10,
    borderColor: 'pink',
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  flatListStyle: {
    width: '100%'
  },
  itemContainer: {
    margin: 20,
    borderWidth:3,
    borderColor: '#d7b0e2',
    padding: 20,
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    width: 180,
    marginVertical: 5,
    backgroundColor: "#d7b0e2",
  }
});

export default BookingList;
