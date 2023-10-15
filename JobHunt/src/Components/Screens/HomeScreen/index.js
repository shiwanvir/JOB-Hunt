import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {PostingList} from "./PostingList";
import {PostingDetails} from "./PostingDetails";
import ApplyScreen from "./ApplyScreen";

const Stack = createStackNavigator();
const HomeScreen = () => {
    return (
        <Stack.Navigator initialRoutName="PostingList">
            <Stack.Screen
                name="Jobs List"
                component={PostingList}
                options={{headerShown: false}}
            />

            <Stack.Screen
                name="Job Details"
                component={PostingDetails}
                options={{headerShown: true, headerTitle: "Job Details"}}
            />
            <Stack.Screen
            name="ApplyScreen"
            component={ApplyScreen}
            options={{ headerShown: true, headerTitle: "Apply" }} 
            />

        </Stack.Navigator>

    );
};

export default HomeScreen;
