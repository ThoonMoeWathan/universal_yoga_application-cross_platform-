import { View, Text, StyleSheet, TextInput, Alert, Button } from 'react-native'
import React, { useState, useContext } from 'react'
import { CartContext } from './CartContext'
import { TouchableOpacity } from 'react-native-gesture-handler'

const BookingAll = () => {

    const { cart, clearCart } = useContext(CartContext)

    const [email, setEmail] = useState('')

    // Data to be sent to the PHP API
    const bookQuery = {
        email: email,
        cartItems: cart
    };

    const bookHandler = async () => {

        console.log("bookHandler: " + email)

        try {
            const response = await fetch("http://192.168.100.102/UniversalYogaSite/bookingAll.php",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookQuery),
                })

            const json = await response.json()
            if (response.ok) {
                Alert.alert("Booking result", "Response: " + json.message)
            }
            else {
                console.log("No result")
            }
        } catch (error) {
            console.error(error)
        }
        clearCart()
    }



    return (
        <View style={styles.container}>
            <Text>Please Enter your email to apply booking.</Text>

            <TextInput
                style={styles.input}
                placeholder='Enter your email'
                value={email}
                onChangeText={setEmail}
            />

            {/* <Button title='Book' onPress={bookHandler} /> */}
            <TouchableOpacity style={styles.button} onPress={bookHandler} >
                <Text>
                    Book
                </Text>
            </TouchableOpacity>
            {/* <Button title='Book' onPress={bookHandler} disabled={isLoading} /> */}
            {/* {isLoading && <Text>Loading...</Text>} */}
        </View>
    )
}

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
        alignItems: "center",
        padding: 15,
        backgroundColor: "#d7b0e2"
    }

})

export default BookingAll