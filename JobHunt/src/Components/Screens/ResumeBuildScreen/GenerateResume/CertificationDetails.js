import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const CertificationDetails = ({
  onNext,
  onBack,
  updateCertificationDetails,
}) => {
  const [certificationName, setCertificationName] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [Certifications, setCertification] = useState([]);
  // Add more state variables for other certification details

  const handleAddCertificate = () => {
    const newCertificateDetails = { certificationName, issuedBy };
    setCertification([...Certifications, newCertificateDetails]);
    setIssuedBy("");
    setCertificationName("");
  };
  const handleNext = () => {
    updateCertificationDetails(Certifications);
    onNext();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Certification Details</Text>
      <TextInput
        placeholder="Certification Name"
        value={certificationName}
        onChangeText={setCertificationName}
        style={styles.input}
      />
      <TextInput
        placeholder="Issued By"
        value={issuedBy}
        onChangeText={setIssuedBy}
        style={styles.input}
      />
      {/* Add more input fields for other certification details */}
      <Button title="Add Certificates" onPress={handleAddCertificate} />
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={onBack} />
        <Button title="Next" onPress={handleNext} />
      </View>
      {Certifications.map((certificate, index) => (
        <View key={index} style={styles.certificateItem}>
          <Text style={{ ...styles.certificateText, fontWeight: "bold" }}>
            {certificate.certificationName}
          </Text>
          <Text style={styles.certificateText}>{certificate.issuedBy}</Text>
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
  certificateItem: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#DCDCDC",
    padding: 10,
    borderRadius: 5,
  },
  certificateText: {
    fontSize: 20,
  },
});

export default CertificationDetails;
