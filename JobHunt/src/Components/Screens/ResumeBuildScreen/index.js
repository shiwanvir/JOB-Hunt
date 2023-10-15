import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ViewMyResume from "./ViewResume/ViewMyResume";
import ResumeHome from "./ResumeHome";
import AddMyResume from "./AddResume/AddMyResume";
import GenerateScreen from "./GenerateResume/GenerateScreen";
import ResumeList from "../ResumeList";
import ResumeDetail from "../ResumeDetail";
const Stack = createStackNavigator();

const ResumeBuildScreen = () => {
  return (
    <Stack.Navigator initialRoutName="ResumeHome">
      <Stack.Screen
        name="ResumeHome"
        component={ResumeHome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ResumeList"
        component={ResumeList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddMyResume" component={AddMyResume} />
      <Stack.Screen name="GenerateScreen" component={GenerateScreen} />
      <Stack.Screen name="ResumeDetail" component={ResumeDetail} />
    </Stack.Navigator>
  );
};

export default ResumeBuildScreen;
