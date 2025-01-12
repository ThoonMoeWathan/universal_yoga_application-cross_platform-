import { View, Text, StyleSheet, FlatList, Button, Alert, Platform, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from './CartContext'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CourseDetails = ({ route }) => {

    const navigation = useNavigation();

    const { addToCart}= useContext(CartContext)

    const { id, date, teacher, courseid } = route.params

    const [courseData, setCourseData] = useState([])

    // Data to be sent to the PHP API
    const getCourseQuery = {
        courseid: parseInt(courseid)
    };
    const baseUrl = Platform.OS === 'web' ? 'http://localhost' : 'http://10.0.2.2';
    // const baseUrl = "http://192.168.100.102";

    const fetchCourseData = async () => {
        try {
            const response = await fetch(`${baseUrl}/UniversalYogaSite/getCourseByID.php`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(getCourseQuery),
                })

            const json = await response.json()
            if (response.ok) {
                setCourseData(json)
            }
            else {
                console.log("no result")
            }
        }

        catch (error) {
            console.error(error)
        }

    }
    useEffect(
        () => {
            fetchCourseData()
        }, []
    );

    const cartHandler = (day, time, type) => {
        let classItem = {id:id, date:date, teacher:teacher, day:day, time:time, type:type}
        addToCart(classItem)
        Alert.alert("Added to Cart", "Successfully added to the shopping cart!",
        [
            {
            text: "ok",
                onPress: () => navigation.navigate("ShowCartList")
            }
            ]
        )
    }

    const showCourseItem = ({ item }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.textStyle}>Course Name: {item.course_name}</Text>
            <Text style={styles.textStyle}>Day: {item.day_of_week}</Text>
            <Text style={styles.textStyle}>Time: {item.time_of_course}</Text>
            <Text style={styles.textStyle}>Member Limit: {item.capacity_of_course}</Text>
            <Text style={styles.textStyle}>Type: {item.type_of_class}</Text>
            <Text style={styles.textStyle}>Price: {item.price_of_course} $</Text>
            <TouchableOpacity style={styles.button} onPress={() => cartHandler(item.day_of_week, item.time_of_course, item.type_of_class)}>
                <Text>
                    Add to Cart
                </Text>
            </TouchableOpacity>
            {/* <Button title="Add to Cart" onPress={()=>cartHandler(item.day_of_week, item.time_of_course, item.type_of_class)}/> */}
        </View>
    );
};

    return (
            <View style={styles.container}>
                {/* <Text style={{ fontSize: 30 }}>Course Details</Text> */}
                <FlatList
                    style={styles.flatListStyle}
                    data={courseData}
                    keyExtractor={(item) => item.id}
                    renderItem={showCourseItem}
                />
            </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        height:"100%",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 45,
    },
    flatListStyle: {
        width: "100%"
    },
    itemContainer: {
        // marginHorizontal: 20,
        backgroundColor: "pink",
        width: "100%",
        height:"100%",
        padding: 20
    },
    textStyle: {
        fontSize: 15
    },
    button: {
        marginTop: 30,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "pink",
    }
})
export default CourseDetails