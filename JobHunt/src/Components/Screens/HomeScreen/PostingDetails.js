import { Button, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { Card } from "react-native-elements";
import React from "react";
import {useStateContext} from "../../../context/StateContext";

export const PostingDetails = ({ route, navigation }) => {
  const { details } = route.params;
  const { getJobPostings, authenticatedUser } = useStateContext();

  const navigateToApplyScreen = () => {
    navigation.navigate("ApplyScreen",{details: details}); // Replace "ApplyScreen" with the actual screen name for the apply screen
  };

  return (
    <ScrollView>
      <View>
        <Card containerStyle={{ marginBottom: 15 }}>
          {authenticatedUser.userType !== "Recruiter" && <View style={{ marginBottom: 20 }}>
            <Button onPress={navigateToApplyScreen} title={"Apply"} />
          </View>}
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            {details?.jobTitle}
          </Text>
          <Text style={{ fontWeight: "bold" }}>{details?.companyName}</Text>
          <Text style={{ fontStyle: "italic" }}>{details?.location}</Text>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            CTC: {details?.salary.toLocaleString()} USD
          </Text>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            Job Type: {details?.jobType}
          </Text>
          <Text style={{ marginTop: 20 }}>{details?.jobDescription}</Text>
          <Text style={{ marginTop: 20, fontWeight: "bold" }}>
            Contact Details:
          </Text>
          <Text>{details?.contactDetails}</Text>
          <Text>{details?.postedBy}</Text>
          {authenticatedUser.userType !== "Recruiter" && <View style={{ marginTop: 20 }}>
            <Button onPress={navigateToApplyScreen} title={"Apply"} />
          </View>}
        </Card>
      </View>
    </ScrollView>
  );
};
