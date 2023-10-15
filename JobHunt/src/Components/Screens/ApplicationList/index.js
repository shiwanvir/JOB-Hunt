import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import ViewMyResume from "./ViewApplicant";
//import ResumeHome from "./ResumeHome";
//import ApplicantsHome from "./ResumeHome";
//import ViewApplicant from "./ViewApplicant";
import ShowList from "./ShowList";
const Stack = createStackNavigator();

const ApplicantsScreen = () => {
  return (
    <Stack.Navigator initialRoutName="ShowList">
      <Stack.Screen
        name="ShowList"
        component={ShowList}
      />
    </Stack.Navigator>
  );
};

export default ApplicantsScreen;
