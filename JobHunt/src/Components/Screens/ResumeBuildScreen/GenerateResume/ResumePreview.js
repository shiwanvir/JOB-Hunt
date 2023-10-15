import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
const ResumePreview = ({
  personalDetails,
  experienceDetails,
  projectDetails,
  educationDetails,
  certificationDetails,
}) => {
  return (
      <>
      {personalDetails && <View contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{personalDetails?.resumeName}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Personal Details</Text>
        <Text style={styles.detail}>Name: {personalDetails.name}</Text>
        <Text style={styles.detail}>Email: {personalDetails.email}</Text>
        <Text style={styles.detail}>Phone: {personalDetails.phone}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Experience</Text>
        {experienceDetails.map((experience, index) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.detail}>Company: {experience.company}</Text>
            <Text style={styles.detail}>Position: {experience.position}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Projects</Text>
        {projectDetails.map((project, index) => (
          <View key={index} style={styles.projectItem}>
            <Text style={styles.detail}>
              Project Name: {project.projectName}
            </Text>
            <Text style={styles.detail}>
              Description: {project.description}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Education</Text>
        {educationDetails.map((education, index) => (
          <View key={index} style={styles.educationItem}>
            <Text style={styles.detail}>School: {education.school}</Text>
            <Text style={styles.detail}>Degree: {education.degree}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Certifications</Text>
        {certificationDetails.map((certification, index) => (
          <View key={index} style={styles.certificationItem}>
            <Text style={styles.detail}>
              Certification Name: {certification.certificationName}
            </Text>
            <Text style={styles.detail}>
              Issued By: {certification.issuedBy}
            </Text>
          </View>
        ))}
      </View>
    </View>}
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  section: {
    marginBottom: 30,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  experienceItem: {
    marginBottom: 10,
  },
  projectItem: {
    marginBottom: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  certificationItem: {
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ResumePreview;
