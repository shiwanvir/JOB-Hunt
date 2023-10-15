import React from "react";
import { ScrollView } from "react-native";
import SelectionTile from "../SelectionTile/selectiontile";

function ResumeHome({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SelectionTile
        name={"📜 My Resume"}
        routeTo={"ResumeList"}
        navigation={navigation}
      />
      <SelectionTile
        name={"📝 Add Resume"}
        routeTo={"AddMyResume"}
        navigation={navigation}
      />
    </ScrollView>
  );
}

export default ResumeHome;
