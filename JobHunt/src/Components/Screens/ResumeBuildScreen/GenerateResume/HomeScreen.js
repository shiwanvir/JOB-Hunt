import React, { useState } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import ResumePreview from "./ResumePreview";
import PersonalDetails from "./PersonalDetails";
import ExperienceDetails from "./ExperienceDetails";
import ProjectDetails from "./ProjectDetails";
import EducationDetails from "./EducationDetails";
import CertificationDetails from "./CertificationDetails";
import { useStateContext } from "../../../../context/StateContext";
import { auth, db } from "../../../Database/dbConfig";
import {collection, addDoc, Timestamp, doc, updateDoc} from "firebase/firestore";
const HomeScreen = ({ navigation }) => {
  const { personalDetails, setPersonalDetails } = useStateContext();
  const [step, setStep] = useState(0);
  const [experienceDetails, setExperienceDetails] = useState([]);
  const [projectDetails, setProjectDetails] = useState([]);
  const [educationDetails, setEducationDetails] = useState([]);
  const [certificationDetails, setCertificationDetails] = useState([]);

  const saveResume = async () => {
    try {
      const currentUser = auth.currentUser;
      const userEmail = currentUser ? currentUser.email : "";
      const docRef = await addDoc(collection(db, "Resumes"), {
        personalDetails: personalDetails,
        experienceDetails: experienceDetails,
        projectDetails: projectDetails,
        educationDetails: educationDetails,
        certificationDetails: certificationDetails,
        postedBy: userEmail, // Include the current user's email as postedBy
        postedDate: Timestamp.fromDate(new Date()),
      });

      const docUpdateRef = doc(db, "Resumes", docRef.id);

      await updateDoc(docUpdateRef, {
        id: docRef.id,
        personalDetails: personalDetails,
        experienceDetails: experienceDetails,
        projectDetails: projectDetails,
        educationDetails: educationDetails,
        certificationDetails: certificationDetails,
        postedBy: userEmail, // Include the current user's email as postedBy
        postedDate: Timestamp.fromDate(new Date()),
      });

      console.log("Resume Data saved");
    } catch (error) {
      console.log("Error in submission", error);
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <PersonalDetails
            onNext={handleNext}
            onBack={handleBack}
            updatePersonalDetails={setPersonalDetails}
          />
        );
      case 1:
        return (
          <ExperienceDetails
            onNext={handleNext}
            onBack={handleBack}
            updateExperienceDetails={setExperienceDetails}
          />
        );
      case 2:
        return (
          <ProjectDetails
            onNext={handleNext}
            onBack={handleBack}
            updateProjectDetails={setProjectDetails}
          />
        );
      case 3:
        return (
          <EducationDetails
            onNext={handleNext}
            onBack={handleBack}
            updateEducationDetails={setEducationDetails}
          />
        );
      case 4:
        return (
          <CertificationDetails
            onNext={handleNext}
            onBack={handleBack}
            updateCertificationDetails={setCertificationDetails}
          />
        );
      default:
        return (
            <ScrollView>
              <ResumePreview
                  personalDetails={personalDetails}
                  experienceDetails={experienceDetails}
                  projectDetails={projectDetails}
                  educationDetails={educationDetails}
                  certificationDetails={certificationDetails}
              />
              <Button title="Save Resume" onPress={saveResume}/>
            </ScrollView>
        );
    }
  };

  return (
      <View style={styles.container}>
        {renderStep()}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white'
  },
});

export default HomeScreen;
