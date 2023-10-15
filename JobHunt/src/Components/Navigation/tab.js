import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Icon} from "react-native-elements";
import HomeScreen from "../Screens/HomeScreen";
import ResumeBuildScreen from "../Screens/ResumeBuildScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import Logo from "../Logo/header";
import PostJobsScreen from "../Screens/PostJobsScreen";
import {useStateContext} from "../../context/StateContext";
import ApplicantsScreen from "../Screens/ApplicantsScreen";
import ApplicationList from "../Screens/ApplicationList";

const Tab = createBottomTabNavigator();

const ReactNavigationBottomTabs = () => {
    const {authenticatedUser} = useStateContext();

    return (
        <Tab.Navigator initialRouteName="Home">
            {authenticatedUser.userType === "Recruiter" ? (
                <Tab.Screen
                    name="Applications"
                    component={ApplicantsScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <Icon name="message" color={color} size={35}/>
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="Resume"
                    component={ResumeBuildScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <Icon name="message" color={color} size={35}/>
                        ),
                    }}
                />
            )}
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: () => <Logo screenName={"JobHunt"}/>,
                    tabBarIcon: ({color, size}) => (
                        <Icon name="home" color={color} size={35}/>
                    ),
                }}
            />
            {authenticatedUser.userType === "Recruiter" ? (
                <Tab.Screen
                    name="Post Job"
                    component={PostJobsScreen}
                    options={{
                        tabBarIcon: ({color, size}) => (
                            <Icon name="person" color={color} size={35}/>
                        ),
                    }}
                />
            ) : (
                <Tab.Screen
                    name="Applications"
                    component={ApplicationList}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({color, size}) => (
                            <Icon name="person" color={color} size={35}/>
                        ),
                    }}
                />
            )}
        </Tab.Navigator>
    );
};

export default ReactNavigationBottomTabs;
