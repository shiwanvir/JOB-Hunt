import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const ExperienceDetails = ({ onNext, onBack, updateExperienceDetails }) => {
  const [experiences, setExperiences] = useState([]);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  // Add more state variables for other experience details

  const handleAddExperience = () => {
    const newExperience = { company, position };
    console.log("New Exp:", newExperience);
    setExperiences([...experiences, newExperience]);
    setCompany("");
    setPosition("");
  };
  const handleNext = () => {
    // const newExperience = { company, position }; // Create an object with collected data
    updateExperienceDetails(experiences); // Update parent component's state
    onNext(); // Move to the next step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Experience Details</Text>
      <TextInput
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
        style={styles.input}
      />
      <TextInput
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
      />
      <Button title="Add Experience" onPress={handleAddExperience} />

      {/* Add more input fields for other experience details */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
      {/* Display added experiences */}
      {experiences.map((experience, index) => (
        <View key={index} style={styles.experienceItem}>
          <Text style={{ ...styles.experienceText, fontWeight: "bold" }}>
            {experience.company}
          </Text>
          <Text style={styles.experienceText}>{experience.position}</Text>
        </View>
      ))}
    </View>
  );
};

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
  experienceItem: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    padding: 10,
    borderRadius: 5,
  },
  experienceText: {
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginStart: 130,
    marginEnd: 130,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ExperienceDetails;
