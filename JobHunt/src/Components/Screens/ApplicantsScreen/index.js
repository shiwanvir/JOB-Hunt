import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ViewMyResume from "./ViewApplicant";
import ResumeHome from "./ResumeHome";
import ApplicantsHome from "./ResumeHome";
import ViewApplicant from "./ViewApplicant";
const Stack = createStackNavigator();

const ApplicantsScreen = () => {
  return (
    <Stack.Navigator initialRoutName="ApplicantsHome">
      <Stack.Screen
        name="ApplicantsHome"
        component={ApplicantsHome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ViewApplicant"
        component={ViewApplicant}
        options={{ headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ApplicantsScreen;
