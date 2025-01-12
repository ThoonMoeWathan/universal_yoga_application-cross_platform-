import { View, Text, StyleSheet, Alert, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Booking = ({ route }) => {
    const id = route?.params?.id;
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const bookHandler = async () => {
        // Check if the email input is empty
        if (!email) {
            Alert.alert("Input Error", "Please enter your email.");
            return; // Exit the function early
        }
        setIsLoading(true);
        const bookQuery = { class_id: id, email: email };

        try {
            const response = await fetch(
                "http://192.168.100.102/UniversalYogaSite/booking.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookQuery),
                }
            );

            const json = await response.json();
            console.log("Fetched Data:", json);

            if (response.ok) {
                Alert.alert("Booking result", "Response: " + json.message);
            } else {
                Alert.alert("Error", "Booking failed");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (!id) {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 25 }}>No class selected for booking.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <Text style={{ fontSize: 30 }}>Booking</Text>
            <Text style={{ fontSize: 30 }}>Class ID: {id}</Text> */}
            <Text>Please Enter your email to apply booking.</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your email'
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={bookHandler} disabled={isLoading} >
                <Text>
                    Book
                </Text>
            </TouchableOpacity>
            {/* <Button title='Book' onPress={bookHandler} disabled={isLoading} /> */}
            {isLoading && <Text>Loading...</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 45,
    },
    input: {
        marginVertical: 10,
        borderColor: "pink",
        width: "90%",
        borderWidth: 2,
        borderRadius: 10,
        padding: 20,
        fontSize: 20,
    },
    button: {
        width: 150,
        borderRadius: 10,
        alignItems:"center",
        padding:15,
        backgroundColor: "#d7b0e2"
    }
});

export default Booking;
