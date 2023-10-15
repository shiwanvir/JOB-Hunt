import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { auth, db } from "../../Database/dbConfig";
import { collection, getDocs, setDoc, doc, query, where, deleteDoc, addDoc, Timestamp } from "firebase/firestore";
import styles from "./styles";

const ApplyScreen = ({ route, navigation }) => {

  const [selectedValue, setSelectedValue] = useState('initial');
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    loadResumeList()
  }, [])

  const loadResumeList = async () => {

    const list = await loadDataFromDB();
    // console.log("List = ",list);
    setResumeList(list);
    
  }

  const handleCancel = () => {
    navigation.navigate("Job Details", {details: details});
  };

  const { details } = route.params;

  console.log("Details: ",details);

  const handleSubmit = async () => {
      
      try {
        const currentUser = auth.currentUser;
        const userEmail = currentUser ? currentUser.email : '';
        const docRef = await addDoc(collection(db, "job-applicants"), {
          
          applicant_id: userEmail, // Include the current user's email as postedBy
          job_posting_id: details.job_id,
          resume_id: selectedValue,
          postedDate: Timestamp.fromDate(new Date())
        });
        console.log('Applied to job successfully.');
        navigation.navigate("Jobs List");
        Alert.alert("Success", "You have successfully applied for the job.");
      } catch (error) {
        console.log("Error in submission", error);
        Alert.alert("Error", "An error occurred while submitting your application.");
      }
  };

  const loadDataFromDB = async () => {
    const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : '';
    const resumeCollectionRef = collection(db, 'Resumes');
    const q = query(resumeCollectionRef, where('postedBy', '==', userEmail));


    try {
      const querySnapshot = await getDocs(q);

      // Extract data from the querySnapshot
      const resList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // resList.push(data);
        // console.log(doc.id)
        resList.push({'id':doc.id, 'resumeName': data.personalDetails.resumeName});
        // console.log("Data: ",data.personalDetails.resumeName);
      });
      return resList;
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // console.log("Resume : ",resumeList);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Apply for the Job
      </Text>
      
        <Picker
         style={[styles.input, { marginLeft: -2 }]}
          selectedValue={selectedValue}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Select Resume" value="Test" />
          {resumeList.map((resume, index) => (
            <Picker.Item
              key={index}
              label={resume.resumeName}
              value={resume.resumeName}
            />
          ))}
        </Picker>

        <View style={styles.button_container}>
        <TouchableOpacity style={[styles.button]}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#FF0000' }]} onPress={() => handleCancel()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

export default ApplyScreen;
