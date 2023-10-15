import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const EducationDetails = ({ onNext, onBack, updateEducationDetails }) => {
  const [Educations, setEducation] = useState([]);
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  // Add more state variables for other education details

  const handleAddEducation = () => {
    const newEducationDetail = { school, degree };
    setEducation([...Educations, newEducationDetail]);
    setSchool("");
    setDegree("");
  };

  const handleNext = () => {
    updateEducationDetails(Educations);
    onNext();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Education Details</Text>
      <TextInput
        placeholder="School"
        value={school}
        onChangeText={setSchool}
        style={styles.input}
      />
      <TextInput
        placeholder="Degree"
        value={degree}
        onChangeText={setDegree}
        style={styles.input}
      />
      <Button title="Add Education" onPress={handleAddEducation} />
      {/* Add more input fields for other education details */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
      {Educations.map((education, index) => (
        <View key={index} style={styles.educationItem}>
          <Text style={{ ...styles.educationText, fontWeight: "bold" }}>
            {education.school}
          </Text>
          <Text style={styles.educationText}>{education.degree}</Text>
        </View>
      ))}
    </View>
  );
};

// Styles and exports similar to other components
const styles = StyleSheet.create({
  container: {
    // Styles for the container view
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 20,
  },
  button: {
    backgroundColor: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 130,
    marginEnd: 130,
    marginTop: 10,
    marginBottom: 10,
  },
  educationItem: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    padding: 10,
    borderRadius: 5,
  },
  educationText: {
    fontSize: 20,
  },
});

export default EducationDetails;
