import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ShowAllList = ({ navigation }) => {
    const [classList, setClassList] = useState([]);

    const fetchClassData = async () => {
        try {
            const response = await fetch("http://192.168.100.102/UniversalYogaSite/getClass.php");
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const json = await response.json();
            setClassList(json);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchClassData();
    }, []);

    const itemView = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                {/* <Text style={{ fontSize: 20 }}>ID: {item.id}</Text> */}
                <Text style={{ fontSize: 20 }}>{item.teacher} Class</Text>
                <Text style={{ fontSize: 20 }}>Start at : {item.date_of_class}</Text>
                <TouchableOpacity
                    style={styles.button}
                    title="More Details..."

                    onPress={() => navigation.navigate('CourseDetails', { id: item.id, date: item.date_of_class, teacher: item.teacher, courseid: item.courseid })}
                >
                    <Text>Detail</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text style={{ fontSize: 20, alignSelf:'flex-start', margin:10 }}>Classes</Text> */}
            <FlatList
                style={styles.flatListStyle}
                data={classList || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={itemView}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 20,
    },
    flatListStyle: {
        width: "100%",
        // marginVertical: 20,
    },
    itemContainer: {
        margin: 10,
        backgroundColor: "#ececec",
        padding: 20,
        borderWidth: 3,
        borderColor: "#d7b0e2",
        borderRadius: 10,
        marginBottom: 20,
    },
    button: {
        marginTop: 30,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "pink",
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "pink",
    }
});

export default ShowAllList;
