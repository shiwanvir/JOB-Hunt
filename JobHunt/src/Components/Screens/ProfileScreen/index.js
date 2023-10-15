import React from "react";
import {View, Text} from "react-native";
import styles from "./styles";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawer from "../../Navigation/CustomDrawer";

const ProfileScreen = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
        >
            <Drawer.Screen name="Profile">
                {() => (
                    <View style={styles.container}>
                        <Text>Profile</Text>
                    </View>
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

export default ProfileScreen;
