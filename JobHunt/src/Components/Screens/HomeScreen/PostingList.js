import { Button, ScrollView, Text, View, Dimensions } from "react-native";
import styles from "./styles";
import { Card } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../../context/StateContext";
//import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../Database/dbConfig";
export const PostingList = ({ navigation }) => {
  const { getJobPostings, authenticatedUser } = useStateContext();
  const [postings, setPostings] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  var data;
  useEffect(() => {
    let ignore = false;
    setPostings([]);
    getJobPostings().then((result) => {
      if (!ignore) {
        if (authenticatedUser.userType === "Recruiter") {
          setPostings(
            result.filter((data) => data.postedBy === authenticatedUser.email)
          );
        } else {
          setPostings(result);
          data = result;
          console.log("JP", result);
        }
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const deleteJob = async (id) => {
    try {
      const docRef = doc(db, "jobPostings", id);
      const result = await deleteDoc(docRef);
      setPostings(postings.filter((post) => post.id != id));
      return true;
    } catch (e) {
      return false;
    }
  };
  return (
    <>
      <View style={{ marginTop: 5 }}></View>
      <ScrollView>
        <View style={styles.container}>
          {postings &&
            postings.map((posting, index) => (
              <Card containerStyle={{ width: screenWidth * 0.95 }} key={index}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    alignSelf: "center",
                  }}
                >
                  {posting?.jobTitle}
                </Text>
                <Text style={{ fontWeight: "bold" }}>
                  {posting?.companyName}
                </Text>
                <Text style={{ fontStyle: "italic" }}>{posting?.location}</Text>
                <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                  Job Type: {posting?.jobType}
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginTop: 10,
                  }}
                >
                  CTC: {posting?.salary?.toLocaleString()} USD
                </Text>
                <View style={{ ...styles.buttonContainer, marginTop: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      title={"Details"}
                      onPress={() => {
                        navigation.navigate("Job Details", {
                          details: posting,
                        });
                      }}
                      style={{ flex: 1 }}
                    />
                    {authenticatedUser.userType === "Recruiter" && (
                      <Button
                        title={"Delete"}
                        onPress={() => deleteJob(posting.id)}
                        color={"red"}
                      />
                    )}
                  </View>
                </View>
              </Card>
            ))}
        </View>
      </ScrollView>
    </>
  );
};
