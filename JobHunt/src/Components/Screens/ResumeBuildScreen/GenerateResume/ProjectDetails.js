import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const ProjectDetails = ({ onNext, onBack, updateProjectDetails }) => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  // Add more state variables for other project details

  const handleAddProjects = () => {
    const newProjectDetails = { projectName, description };
    setProjects([...projects, newProjectDetails]);
    setProjectName("");
    setDescription("");
  };

  const handleNext = () => {
    updateProjectDetails(projects);
    onNext();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Project Details</Text>
      <TextInput
        placeholder="Project Name"
        value={projectName}
        onChangeText={setProjectName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      {/* Add more input fields for other project details */}
      <Button title="Add Projects" onPress={handleAddProjects} />
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
      {projects.map((project, index) => (
        <View key={index} style={styles.projectItem}>
          <Text style={{ ...styles.projectText, fontWeight: "bold" }}>
            {project.projectName}
          </Text>
          <Text style={styles.projectText}>{project.description}</Text>
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
    marginBottom: 10,
    marginTop: 10,
  },
  projectItem: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    padding: 10,
    borderRadius: 5,
  },
  projectText: {
    fontSize: 20,
  },
});

export default ProjectDetails;
