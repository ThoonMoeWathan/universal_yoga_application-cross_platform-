import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity,SafeAreaView, Alert} from 'react-native'
import React, {useContext} from 'react'
import { CartContext } from './CartContext';

const ShowCartList = ({navigation}) => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext)
  
  const bookingAllHandler = () => {
    if (cart.length == 0) {

      Alert.alert("No item", "Please add item to the cart before booking!")
      return
    }
    navigation.navigate('BookingAll')
  }

  const itemView = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        {
          console.log("ID: " + item.id)
        }
        <Text style={{ fontSize: 15 }}>Date: {item.date}</Text>
        <Text style={{ fontSize: 15 }}>Teacher: {item.teacher}</Text>
        <Text style={{ fontSize: 15 }}>Day: {item.day}</Text>
        <Text style={{ fontSize: 15 }}>Time: {item.time}</Text>
        <Text style={{ fontSize: 15 }}>Type: {item.type}</Text>
        <View style={{ flexDirection: "row", marginVertical:10 }}>
          <View style={{ marginEnd: 10 }}>
            <TouchableOpacity
              style={styles.buttonItem}
              onPress={() => removeFromCart(item.id)}>
              <Text>Remove</Text>
            </TouchableOpacity>
            {/* <Button
              title="Remove from Cart"
              onPress={() => removeFromCart(item.id)}
            /> */}
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttonItem}
              onPress={() => {
                removeFromCart(item.id)
                navigation.navigate("Booking", { id: item.id })
              }
              }>
              <Text>Book</Text>
            </TouchableOpacity>
            {/* <Button
              title="Book"
              onPress={() => {
                removeFromCart(item.id)
                navigation.navigate("Booking", { id: item.id })
              }
              }
            /> */}
          </View>
          
          
        </View>
        
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={{ fontSize: 25 }}>Cart List</Text> */}
      <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.button}
          onPress={bookingAllHandler}>
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>
            Book All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRed} onPress={clearCart}>
          <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>Clear All</Text>
        </TouchableOpacity>
        
      </View>
      {cart.length > 0 ? (
        <FlatList
          style={styles.flatListStyle}
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={itemView}
        />) :
        (<Text style={{ color: "red", alignSelf:"center", marginTop:50}}>No item in the booking cart.</Text>)
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:20,
    marginTop: 50,
    fontSize: 45,
  },
  flatListStyle: {
    width: "100%"
  },
  itemContainer: {
    marginTop:30,
    backgroundColor: "#ececec",
    width: "100%",
    padding: 20,
    borderWidth: 3,
    borderColor: "#d7b0e2",
    borderRadius: 10,
  },
  textStyle: {
    fontSize: 30
  },
  button: {
    alignItems:"center",
    borderRadius: 10,
    padding: 10,
    width:180,
    marginVertical: 5,
    backgroundColor: "#d7b0e2",
  },
  buttonRed:{
    alignItems: "center",
    borderRadius: 10,
    width:180,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f77f58",
    marginStart: 15
  },
  buttonItem: {
    backgroundColor: "#d7b0e2",
    padding: 10,
    borderRadius: 10,
    alignItems:"center",
    width:100
  }
})
export default ShowCartList