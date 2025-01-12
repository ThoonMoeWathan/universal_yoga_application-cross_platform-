import { View, Text, } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import ShowAllList from './ShowAllList.js'
import Booking from './Booking.js'
import CourseDetails from './CourseDetails.js'
import BookingAll from './BookingAll.js'

const stack = createStackNavigator()

const Home = () => {
    return (
        <stack.Navigator>
            <stack.Screen
                name="Available Classes"
                component={ShowAllList}
            />
            <stack.Screen
                name="CourseDetails"
                component={CourseDetails}
            />
            <stack.Screen
                name="Booking"
                component={Booking}
            />
            <stack.Screen
                name="BookingAll"
                component={BookingAll} />
        </stack.Navigator>
  )
}

export default Home;